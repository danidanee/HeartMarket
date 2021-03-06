package com.heartmarket.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.UserResponse;
import com.heartmarket.model.service.AreaService;
import com.heartmarket.model.service.EmailService;
import com.heartmarket.model.service.JwtService;
import com.heartmarket.model.service.MannerService;
import com.heartmarket.model.service.ImgService;
import com.heartmarket.model.service.UserService;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService us;
	@Autowired
	AreaService as;
	@Autowired
	EmailService ms;
	@Autowired
	JwtService jwts;
	@Autowired
	ImgService is;
	@Autowired
	MannerService ns;
	
	private ResultMap<TradeImg> rm;
	
	@RequestMapping(value = "/user/login", method = RequestMethod.GET)
	public ResponseEntity<Object> loginUser(HttpServletRequest req,@RequestParam String email, @RequestParam String password) throws Exception {
		log.trace("loginUser");
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			if (us.login(email, password)) {
				User user = us.searchEmail(email);
				user.setPassword(password);
				String token = jwts.makeJwt(user);
				double heartgauge = ns.findManner(email).getData().get("heartgauge");
				resultMap.put("state", "OK");
				resultMap.put("data", new UserResponse(user, heartgauge));
				resultMap.put("token", token);
				return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
			} else {
				resultMap.put("state", "FAIL");
				resultMap.put("data", "LOGIN_FAIL");
				resultMap.put("token", null);
				return new ResponseEntity<Object>(resultMap, HttpStatus.NOT_ACCEPTABLE);
			}
		} catch (Exception e) {
			log.error("login Error");
			e.printStackTrace();
			throw e;
		}
	}

	// Email 중복 조회
	@ApiOperation(value = "회원가입시 입력된 이메일의 중복 여부 확인")
	@RequestMapping(value = "/user/{email}", method = RequestMethod.GET)
	public ResponseEntity<Object> findOne(@PathVariable String email) {
		log.trace(email, "findByEmail");
		return new ResponseEntity<Object>(us.duplicatedByEmail(email), HttpStatus.OK);
	}
	
	// 회원가입
	@ApiOperation(value = "회원가입 기능 (User <-> Area 연쇄 저장) ")
	@RequestMapping(value = "/user/signUp", method=RequestMethod.POST)
	public ResponseEntity<Object> signUp(@RequestParam String email,
			@RequestParam String password,
			@RequestParam String nickname,
			@RequestParam(required = false)  MultipartFile profile,
			@RequestParam String address,
			 HttpServletRequest req) throws Exception {
		log.trace("signUp_User");
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			User user = us.searchEmail(email); 
			// count는 유저번호를 위한 변수로 Area 삽입시 DB적용이 되지 않기 때문에 필요로한 변수이다.
			int count = us.searchCount();
			if(user==null) {
				password = BCrypt.hashpw(password, BCrypt.gensalt());
				rm = is.uploadFile(profile, "/home/ubuntu","profile");
//				user = new User(count, email, password, profileImg, nickname, "user");
				user = new User(email, password, rm.getData().getOrgImg() == null ? null : rm.getData().getOrgImg(), nickname, "ROLE_USER");
				us.signUp(user,address);
//				as.insertArea(address,count);
				resultMap.put("state", "OK");
				resultMap.put("data", "SUCCESS");
				return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
			} else {
				resultMap.put("state", "FAIL");
				resultMap.put("data", "SIGNUP_FAIL");
				return new ResponseEntity<Object>(resultMap, HttpStatus.NOT_ACCEPTABLE);
			}
		} catch (Exception e) {
			log.error("signUp Error");
			e.printStackTrace();
			throw e;
		}
	}
	@ApiOperation(value = "지역 정보 조회를 위한 테스트 기능")
	@RequestMapping(value = "/user/area", method = RequestMethod.GET) 
	public ResponseEntity<Object> searchArea(HttpServletRequest request,@RequestParam String address){
		try {
			List<Area> area = as.searchAreaByAddress(address);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			resultMap.put("status", "OK");
			resultMap.put("data", area);
			return new ResponseEntity<Object>(resultMap, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	// 이메일 보내기
	@ApiOperation(value = "회원가입시 중복 여부 확인 결과를 통해 인증 키 를 메일로 보내는 기능")
	@RequestMapping(value = "/user/mail", method = RequestMethod.GET)
	public ResponseEntity<Object> sendmail(@RequestParam String email) throws Exception {
		try {
			Random r = new Random();
			int key = r.nextInt(4589362)+49311;
			ms.sendMail(email,key);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("state", "OK");
			resultMap.put("data", key);
			return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	// 유저 수정
	@ApiOperation(value = "회원 수정관련 기능")
	@RequestMapping(value = "/user/updateUser", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateUser(@RequestParam String email,
			@RequestParam(required = false) String password,
			@RequestParam String nickname,
			@RequestParam(required = false) MultipartFile profile,
			@RequestParam String address,
			HttpServletRequest req) throws Exception{
		try {
			User user = us.searchEmail(email);
			List<Area> area = user.getUArea();
			for (Area area2 : area) {
				if (area2.getAUser().getUserNo() == user.getUserNo()) {
					area2.setAUser(user);
					area2.setAddress(address);
					as.updateArea(area2);
				}
			}
			String imgUploadPath = File.separator + "home"+File.separator+"ubuntu";
//			rm = is.uploadFile(profile, req.getSession().getServletContext().getRealPath("/"));
			if(profile != null) {
				rm = is.uploadFile(profile, imgUploadPath,"profile");
				user.setProfileImg(rm.getData().getOrgImg());
			}
			if(password != null) {
				password = BCrypt.hashpw(password, BCrypt.gensalt());
				user.setPassword(password);
			}
			user.setNickname(nickname);
			us.update(user);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("state", "OK");
			resultMap.put("data", user);
			return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@RequestMapping(value = "/user/delete/{email}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> delUser(@PathVariable String email){
		return null;
	}
	
	@RequestMapping(value = "/user/nickname", method = RequestMethod.GET)
	public ResponseEntity<Object> findByNicknae(@RequestParam int tradeNo, @RequestParam int userNo){
		ResultMap<Object> result = us.findAllByNickname(tradeNo, userNo);
				return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
}

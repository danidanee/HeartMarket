package com.heartmarket.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.Mail;
import com.heartmarket.model.service.MailService;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class MailController {
	@Autowired
	MailService ms;
	
	ResultMap<Mail> rm;
	ResultMap<List<Mail>> rms;
	
	@RequestMapping(value = "/mail/send",method = RequestMethod.POST)
	public ResponseEntity<Object> sendMail(@RequestParam String senderMail
			, @RequestParam String receiverMail,@RequestParam String tradeNo,@RequestParam String title,@RequestParam String content) {
		rm = ms.addSender(senderMail, receiverMail,tradeNo,title,content);
		return new ResponseEntity<Object>(rm, HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 보낸 쪽지 조회하기")
	@RequestMapping(value = "/mail/findAllSend",method = RequestMethod.GET)
	public ResponseEntity<Object> searchSend(@RequestParam int no,@RequestParam String senderMail){
		List<Mail> mList = ms.findAllSend(no,15,senderMail).getContent();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("state", "SUCCESS");
		result.put("message", "보낸 쪽지 조회 성공");
		result.put("data", mList);
		result.put("total", ms.findAllSendCount(senderMail));
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "받은 쪽지 중 읽은 쪽지 조회하기")
	@RequestMapping(value = "/mail/findAllReaded",method = RequestMethod.GET)
	public ResponseEntity<Object> searchReaded(@RequestParam int no,@RequestParam String receiverMail){
		List<Mail> mList = ms.findAllReaded(no,15,receiverMail).getContent();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("state", "SUCCESS");
		result.put("message", "읽은 쪽지 조회 성공");
		result.put("data", mList);
		result.put("total", ms.findReadCount(receiverMail));
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "받은 쪽지 중 안읽은 쪽지 조회하기")
	@RequestMapping(value = "/mail/findAllUnReaded",method = RequestMethod.GET)
	public ResponseEntity<Object> searchUnReaded(@RequestParam int no,@RequestParam String receiverMail){
		List<Mail> mList = ms.findAllUnReaded(no,15,receiverMail).getContent();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("state", "SUCCESS");
		result.put("message", "안읽은 쪽지 조회 성공");
		result.put("data", mList);
		result.put("total", ms.findUnReadCount(receiverMail));
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "전체 받은 쪽지 조회하기")
	@RequestMapping(value = "/mail/findAllReceive",method = RequestMethod.GET)
	public ResponseEntity<Object> searchRecent(@RequestParam int no,@RequestParam String receiverMail) {
		List<Mail> mList = ms.findAllReceive(no, 15, receiverMail).getContent();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("state", "SUCCESS");
		result.put("message", "전체 받은 쪽지 목록 불러오기 완료");
		result.put("data", mList);
		result.put("total", ms.findAllReceiveCount(receiverMail));
		return new ResponseEntity<Object>(result,HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/mail/delSender",method = RequestMethod.GET)
	public ResponseEntity<Object> delSender(@RequestParam String senderMail,@RequestParam String mailNo){
		rm = ms.deleteSender(senderMail,mailNo);
		return new ResponseEntity<Object>(rm, HttpStatus.OK);
	}
	@RequestMapping(value = "/mail/delReceiver",method = RequestMethod.GET)
	public ResponseEntity<Object> delReceiver(@RequestParam String receiverMail,@RequestParam String mailNo){
		rm = ms.deleteReceiver(receiverMail,mailNo);
		return new ResponseEntity<Object>(rm, HttpStatus.OK);
	}
	@ApiOperation(value = "안읽은 메일 클릭시 읽음 처리를 위한 기능")
	@RequestMapping(value = "/mail/readReceiver",method = RequestMethod.GET)
	public ResponseEntity<Object> readReceiver(@RequestParam String receiverMail,@RequestParam String mailNo){
		rm = ms.readReceiver(receiverMail, mailNo);
		return new ResponseEntity<Object>(rm, HttpStatus.OK);
	}
}

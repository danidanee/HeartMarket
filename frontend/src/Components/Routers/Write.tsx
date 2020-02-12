import React, { Component } from "react";
import "./Write.scss";
import axios from "axios";
// import { Upload, Button, Icon, } from 'antd';
// import 'antd/dist/antd.css';
//npm install antd --save
//https://gary-shen.github.io/ant-design/components/upload/

import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import Footer from "../common/Footer";

class Write extends Component {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  state = {
    title: "",
    explain: "",
    price: "",
    category: "1",
    images: [],
    filekey: 0,
    base64: []
  };

  // setStateAsync(state: object) {
  //   return new Promise(resolve => {
  //     this.setState(state, resolve);
  //   });
  // }

  //이미지 여러개 업로드
  InputChange = (e: any) => {
    //같은 이미지를 연속으로 선택하는 게 막혀있어서 바꾼 코드
    this.setState({
      filekey: this.state.filekey + 1
    });
    //input 값 변경 감지해 설정
    if (e.target.name !== "images") {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    //이미지일때는 다르게 설정
    else {
      let number = e.target.files?.length;
      //파일이 선탯되었을 때
      if (number !== undefined && number !== 0) {
        if (number + this.state.images.length > 5) {
          alert("파일은 최대 5개까지 업로드 가능합니다.");
        }
        //이미지 파일 기존배열에 추가해주기
        else {
          var image = this.state.images;
          for (var i = 0; i < number; i++) {
            let file = e.target.files[i];
            image = image.concat(file);
          }
          this.setState({
            images: image
          });
          //이미지 변경 함수 호출
          for (var j = 0; j < image.length; j++) this.ChangeImage(image[j]);
        }
      }
    }
  };

  //이미지 변경됐을 때 프리뷰
  ChangeImage = (e: any) => {
    let reader = new FileReader();
    reader.onloadend = e => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          base64: [...this.state.base64, base64.toString()] // 파일 base64 상태 업데이트
        });
      }
    };
    if (e) {
      reader.readAsDataURL(e); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  RemoveImg = (e: any) => {

    let forward = this.state.images.slice(0,e.target.id);
    let back = this.state.images.slice(Number(e.target.id) + 1 ,this.state.base64.length);

    let forward64 = this.state.base64.slice(0, e.target.id);
    let back64 = this.state.base64.slice(Number(e.target.id) + 1 ,this.state.base64.length);

    this.setState({
      images: forward.concat(back),
      base64: forward64.concat(back64)
    });

  };

  // //글쓴 내용 보내기
  // handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (this.state.images.length === 0) {
  //     alert("최소 1개의 파일을 선택해주세요.");
  //     return;
  //   }
  //   let formData = new FormData();
  //   for (var i = 0; i < this.state.images.length; i++) {
  //     let file = this.state.images[i];
  //     formData.append("files", file);
  //   }

  //   axios({
  //     method: "post",
  //     url: "http://13.125.55.96:8080/trade/add",
  //     headers: {
  //       "content-type": "multipart/form-data"
  //     },
  //     params: {
  //       productInfo: this.state.explain,
  //       productPrice: this.state.price.toString,
  //       tradeArea: this.user.address,
  //       tradeCategory: this.state.category,
  //       tradeTitle: this.state.title,
  //       userNo: this.user.id
  //     },
  //     data: formData
  //   })
  //     .then(res => {
  //       console.log(res.data.data);
  //       console.log("tjdddd");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       alert(error);
  //       e.preventDefault();
  //     });
  //   e.preventDefault();
  // };
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let files:File[];
    files = this.state.images;
    let tradeTitle = this.state.title;
    let tradeCategory = this.state.category;
    let productPrice = this.state.price;
    let userNo: string = this.user.userNo;
    let tradeArea: string = this.user.uarea[0].address;
    let productInfo = this.state.explain;
    let formdata = new FormData();
    formdata.append("tradeTitle",tradeTitle);
    formdata.append("tradeCategory",tradeCategory);
    formdata.append("productPrice",productPrice);
    formdata.append("userNo",userNo);
    formdata.append("tradeArea",tradeArea);
    formdata.append("productInfo",productInfo);
    for(let i=0;i<files.length;i++) {
      console.log(files[i])
      formdata.append("files",files[i]);
    }
    axios({
      method: "POST",
      url: "http://13.125.55.96:8080/trade/add",
      headers : { 'content-type' : 'multipart/form-data'},
      data: formdata
    })
      .then(res => {
        console.log(res);
        console.log("tjdddd");
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="Write">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                className="write_address"
                value={this.user.uarea[0].address}
                type="text"
                readOnly
              ></input>
              <select
                className="write_category"
                name="category"
                onChange={e => this.InputChange(e)}
              >
                <option value={"1"}>카테고리1</option>
                <option value={"2"}>카테고리2</option>
                <option value={"3"}>카테고리3</option>
                <option value={"4"}>카테고리4</option>
                <option value={"5"}>카테고리5</option>
                <option value={"6"}>카테고리6</option>
              </select>
              <input
                className="write_input"
                name="title"
                type="text"
                placeholder="글 제목을 입력해주세요."
                onChange={e => this.InputChange(e)}
                required
              ></input>
              <input
                className="write_input"
                name="price"
                type="number"
                min="0"
                placeholder="가격을 입력해주세요."
                onChange={e => this.InputChange(e)}
                required
              ></input>
              <textarea
                className="textarea"
                name="explain"
                placeholder="상품 설명을 입력해주세요"
                onChange={e => this.InputChange(e)}
                required
              ></textarea>
              <div className="filebox">
                <label>
                  제품 사진 업로드
                  <input
                    key={this.state.filekey}
                    className="write_input"
                    multiple
                    id="ex_file"
                    type="file"
                    name="images"
                    onChange={e => this.InputChange(e)}
                  />
                </label>
                <div className="write_filenum">
                  {this.state.images.length}개의 사진이 업로드 되었습니다.
                </div>
              </div>

              <div>
                {this.state.images.length > 0 && (
                  <div>
                    <span className="X" id="0" onClick={e => this.RemoveImg(e)}>
                      X
                    </span>
                    <img
                      className="image_preview"
                      alt="img1"
                      src={this.state.base64[0]}
                    />
                  </div>
                )}
                {this.state.images.length > 1 && (
                  <div>
                    <span className="X" id="1" onClick={e => this.RemoveImg(e)}>
                      X
                    </span>
                    <img
                      className="image_preview"
                      alt="img2"
                      src={this.state.base64[1]}
                    />
                  </div>
                )}
                {this.state.images.length > 2 && (
                  <div>
                    <span className="X" id="2" onClick={e => this.RemoveImg(e)}>
                      X
                    </span>
                    <img
                      className="image_preview"
                      alt="img2"
                      src={this.state.base64[2]}
                    />
                  </div>
                )}
                {this.state.images.length > 3 && (
                  <div>
                    <span className="X" id="3" onClick={e => this.RemoveImg(e)}>
                      X
                    </span>
                    <img
                      className="image_preview"
                      alt="img2"
                      src={this.state.base64[3]}
                    />
                  </div>
                )}
                {this.state.images.length > 4 && (
                  <div>
                    <span className="X" id="4" onClick={e => this.RemoveImg(e)}>
                      X
                    </span>
                    <img
                      className="image_preview"
                      alt="img2"
                      src={this.state.base64[4]}
                    />
                  </div>
                )}
              </div>

              <button>등록</button>
              <button>취소</button>
            </div>
          </form>
        </div>
        <TopButton></TopButton>
        <Footer></Footer>
      </>
    );
  }
}
export default Write;

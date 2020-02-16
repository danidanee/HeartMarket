import React, { Component } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from "axios";
//import ItemCard from "../users/ItemCard";
import {Link} from 'react-router-dom';

import "./UserProfile.scss";
import SessionDelete from "../common/SessionDelete";

export interface Sale {
  tradeNo: number;
  pprice:  string;
  uimg:    string;
  ttitle:  string;
  tarea:   string;
  imgarr: img[];
}

interface img {
  imgNo: number;
  tiTrade: number;
  orgImg: string;
}

class UserProfile extends Component {
    state = {
        isLoad: false,
        sales: Array<Sale>(),
        producImg: Array<img>(),
        user: {otherNo: 0, otherImg: '', otherNickname: '', otherHg: ''}
    };

    url = window.location.href.split("/");
    userNo = this.url[this.url.length - 1];

    componentDidMount() {
      axios({
        method: "get",
        url: "http://70.12.246.87:8080/mypage/{userno}",
        params: {
          userno: this.userNo
        }
      }).then(res => {
          this.setState({
            user: res.data.data
          })
      }).catch(err => {
        console.log(err);
          alert('error');
      })


        axios({
            method: "get",
            url: 'http://70.12.246.87:8080/mypage/detail/'+this.userNo,
            params: {
              no: 0
            }
        }).then(res => {
            this.setState({
              sales: res.data.data,
              // productImg: res.data.data[0]
            })
            console.log(res);
        }).catch(err => {
          console.log(err);
          alert('error');
        });
    }

    render() {
        return (
            <>
                <SessionDelete></SessionDelete>
                <Header />
                <div className="user-profile">
                    <div className="profile">
                        <div className="profile-img-wrapper">
                            <img
                                className="profile-img"
                                alt="profile"
                                src={this.state.user.otherImg}
                            ></img>
                        </div>
                        <div className="info">
                            <div>
                                {/* link 수정이 필요함 */}
                                {this.state.user.otherNickname}님
                                <br />
                            </div>
                        </div>
                        <div></div>
                        <div className="attack">
                            <div>심쿵 BPM</div>
                            <div>
                                <img
                                    className="heart-img"
                                    alt="heart"
                                    src="https://image.flaticon.com/icons/svg/1584/1584687.svg"
                                ></img>
                            </div>
                            <div>{this.state.user.otherHg} BPM</div>
                        </div>
                    </div>
                    <hr />
                    <div className="user-sale">
                        <h3>판매 상품</h3>
                        <div className="products">
                            {this.state.sales ?
                            <>
                            {this.state.sales.map((sale, i) => {
                                    return (
                                        <>
                                            <Link to={`/search/detail/${sale.tradeNo}`}>
                                                {/* <ItemCard
                                                    image={sale.imgarr}
                                                    tradeTitle={sale.ttitle}
                                                    productPrice={sale.pprice}
                                                /> */}
                                                {/* <div className="item" key={"item" + i}>
                                                <h3>{sale.tradeTitle}</h3>
                                            </div> */}
                                            </Link>
                                            
                                        </>
                                    );
                            })}
                            </>
                            :
                            <div><h4>판매 상품이 없습니다.</h4></div>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default UserProfile;

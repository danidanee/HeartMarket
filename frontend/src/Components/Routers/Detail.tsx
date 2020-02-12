import React from "react";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import axios from "axios";
import Ganji from "../main/Ganji";
import Gauge from "../common/hamburger/Gauge";
import "./Detail.scss";

class Detail extends React.Component {
    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    url = window.location.href.split("/");
    num = this.url[this.url.length - 1];

    state = {
        trade: {
            tradeTitle: "",
            tradeCategory: "",
            tradeArea: "",
            ttradeImg: [],
            productInfo: "",
            productPrice: "",
            tuser: { nickname: "", profileImg: "", email: "" },
            buser: ""
        }
    };

    clickHeart = () => {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/cart/insert",
            params: {
                tradeNo: this.num,
                userNo: this.user.userNo
            }
        }).then(res => {
            console.log(res);
            alert('심쿵 상품으로 추가되었습니다.')
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/trade/" + this.num
        })
            .then(res => {
                // console.log(res.data);
                const trade = res.data;
                this.setState({
                    trade
                });
                console.log("trade", this.state.trade);
            })
            .catch(err => {
                console.log("err", err);
                alert("error");
            });
    }

    render() {
        return (
            <div>
                <Header />
                <Nav />
                <div className="product-detail">
                    <hr />
                    <div className="detail-grid">
                        <div className="detail-l">
                            <img src="https://lh3.googleusercontent.com/proxy/Oyz8JPrTEZh7iiPcX-MxAnFeFv8lMlJBXN8PKmHEtIjljVS_rIJ5_Gdc4VNHy48fskPs0IvPgg1Y5SbfYZ-DYw0qawFFErnv_1L1hKWosQn2ABd0B3t7BliqWT-0Qcuzn8cGbbcfNUj0QUH68E6fg_1qED4O9_df" alt="" />
                        </div>
                        <div className="detail-r">
                            <div className="tuser-info">
                                <div className="tuser-profile">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="profile"
                                    />
                                </div>
                                <div className="tuser-id">
                                    <h3>{this.state.trade.tuser.nickname}</h3>
                                    <h4>{this.state.trade.tradeArea}</h4>
                                </div>
                                <div className="tuser-manners">
                                    <h3>매너</h3>
                                    <h3>지수</h3>
                                </div>
                            </div>
                            <div className="trade">
                                <h4>카테고리 > {this.state.trade.tradeCategory}</h4>
                                <h2>{this.state.trade.tradeTitle}</h2>
                                <br/>
                                <h3>{this.state.trade.productPrice}원</h3>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            {this.user.email === this.state.trade.tuser.email
                            ?
                            <div className="tuser-btn">
                                <button className="btn-complete">거래완료</button>
                                <button className="btn-delete">삭제</button>
                                <button className="btn-update">수정</button>
                            </div>
                            :
                            <></>}
                            {/* <div className="tuser-manners">
                                <h3>매너 지수</h3>
                                <Gauge />
                            </div> */}
                            <div className="bottom">
                                <button className="btn-heart" onClick={this.clickHeart}>♥</button>
                                <button className="btn-contact">채팅? 쪽지? 거래하기</button>
                            </div>
                        </div>
                    </div>
                    <div className="product-info">
                        <h3>
                            <span>상품 상세 설명</span>
                        </h3>
                        <h3>{this.state.trade.productInfo}</h3>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Detail;

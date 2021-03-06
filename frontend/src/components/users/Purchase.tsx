/* eslint-disable array-callback-return */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../users/MannerModal";
import ItemCard from "./ItemCard";

import "./Items.scss";
import SessionDelete from "../common/SessionDelete";

export interface purchase {
    eval: number;
    btrade: Btrade;
  }
  export interface Btrade {
    tradeNo: number;
    tradeCategory: string;
    tradeTitle: string;
    tradeArea: string;
    productInfo: string;
    productPrice: number;
    tradeDate: Date;
    tuser: number;
    buser: number;
    ttradeImg: TtradeImg[];
  }
  export interface TtradeImg {
    imgNo: number;
    tiTrade: TITrade;
    orgImg: string;
  }
  export interface TITrade {
    tradeNo: number;
    tradeCategory: string;
    tradeTitle: string;
    tradeArea: string;
    productInfo: string;
    productPrice: number;
    tradeDate: Date;
    tTradeImg: TTradeImg[];
    tuser: User;
    buser: User;
  }
  export interface User {
    userNo: number;
    email: string;
    password: string;
    profileImg: string;
    nickname: string;
    userPermission: string;
    uarea: Uarea[];
  }
  export interface Uarea {
    areaNo: number;
    address: string;
    auser: number;
  }
  export interface TTradeImg {
    imgNo: number;
    tiTrade: number;
    orgImg: string;
  }

class Purchase extends React.Component {
    state = {
        Purchases: Array<purchase>(),
        isModalOpen: []
    };

    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    openModal = (idx: number) => {
        this.setState({
            isModalOpen: [...this.state.isModalOpen.slice(0, idx), 
                          true, 
                          ...this.state.isModalOpen.slice(idx+1)]
          })
    };
    closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    componentDidMount() {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/mypage/buy",
            params: {
                email: this.user.email
            }
        })
            .then(res => {
                // console.log("purchase", res.data.data);
                this.setState({
                    Purchases: res.data.data,
                    isModalOpen: res.data.data.map(() => {
                        return false;
                      })
                });
            })
            .catch(err => {
                // console.log(err);
            });
    }

    render() {
        return (
            <div className="purchase">
                <SessionDelete></SessionDelete>
                <h3>구매 상품</h3>
                <div className="products">
                    {this.state.Purchases ? (
                        <>
                            {this.state.Purchases.map((purchase, i) => {
                                if (i < 4) {
                                    return (
                                        <>
                                            <div className="purchase-modalbtn">
                                                <Link
                                                    to={`/search/detail/${purchase.btrade.tradeNo}`}
                                                >
                                                    <ItemCard
                                                        image={purchase.btrade.ttradeImg[0].tiTrade.tTradeImg}
                                                        tradeTitle={purchase.btrade.tradeTitle}
                                                        productPrice={purchase.btrade.productPrice.toString()}
                                                        tradeNo={purchase.btrade.tradeNo}
                                                    />
                                                </Link>
                                                {purchase.eval === 0 ? (
                                                    <>
                                                    <button
                                                        className="btn-manner-modal"
                                                        onClick={(e) => this.openModal(i)}
                                                    >
                                                        평가하기
                                                    </button>
                                                    <Modal
                                                        isOpen={this.state.isModalOpen[i]}
                                                        close={this.closeModal}
                                                        userNo={purchase.btrade.tuser}
                                                        tradeNo={purchase.btrade.tradeNo}
                                                    />
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </>
                                    );
                                }
                            })}
                        </>
                    ) : (
                        <div className="item">
                            <h4>구매 상품이 없습니다.</h4>
                        </div>
                    )}
                    <div className="product-more-wrapper">
                        <Link to="/purchase">
                            <button className="btn-purchase-more">
                                <h3>+ 구매 상품 더보기</h3>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Purchase;

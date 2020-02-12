import React, { ChangeEvent } from 'react';
import "./Header.scss";
import logo from "../img/두근마켓3.png";
import logo2 from "../img/두근마켓2.png";

import { Link } from "react-router-dom";
import Hamburger from "./hamburger/Hamburger";

function Header() {
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    window.sessionStorage.setItem('searchText', e.target.value);
  }
  return (
    <header className="Header">
      <div className="div">
        <Hamburger></Hamburger>
        <Link to={{ pathname: "/" }}>
          <img className="Logo1" alt="logo" src={logo}></img>
          <img className="Logo2" alt="logo" src={logo2}></img>
        </Link>
        <input onChange={onChange} className="input_search" id="input_search" type="text"></input>
        <Link to="/search">
        <button className="btn_search" type="button">
          <img
            className="img_search"
            alt="search"
            src="https://image.flaticon.com/icons/svg/711/711319.svg"
          ></img>
        </button>
        </Link>
        
      </div>
    </header>
  );
}

export default Header;

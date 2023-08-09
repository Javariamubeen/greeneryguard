import React from "react";
import { Spin, Icon } from "antd";
import './styles.css';

export const Loading = () => {
  return (
      <div className="loader">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-circle"></div>
          <div className="preloader-img">
            <img src="img/core-img/leaf.png" alt="" />
          </div>
        </div>
      </div>
  )
};

import React from 'react';
import { Row} from "antd";


const ContentNavigation = (props)=>{

    return (
<Row type="flex" className="justify-content-center">
          <nav
            id="nav-topic"
            className="navbar navbar-expand-lg content-nav d-flex justify-content-center"
          >
            <ul className="navbar-nav main-nav align-items-md-center">
              <li className="nav-item">
                <a href="#about">About</a>
              </li>
              <li className="nav-item">
                {" "}
                <a href="#forms">Forms</a>
              </li>

              <li className="nav-item">
                {" "}
                <a href="#reports">Reports</a>
              </li>
              <li className="nav-item">
                {" "}
                <a href="#links">Links</a>
              </li>
            </ul>
          </nav>
        </Row>
    );
}

export default ContentNavigation;
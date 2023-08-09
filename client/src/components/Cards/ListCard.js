import React from "react";
import { Card, Row, Col } from "antd";

const ListCard = ({ imageUrl, heading, subHeading, date }) => {
  return (
    <Card
      className="card-border"
      style={{ width: '100%'}}
      size="small"
      hoverable
    >
      <Row className="list-items">
        <Col span={4}>
          <img src="https://www.magnet4blogging.net/wp-content/uploads/2019/10/blog-planner-2020.jpg" />
        </Col>
        <Col span={10}>
          <h2 className="heading">
            <span
              className="initial"
              style={{ marginLeft: "20px", marginRight: "10px" }}
            >
              ZO
            </span>
            Oragnized
          </h2>
        </Col>
        <Col span={10} className="intro-text">
          <span>Zo Tax intro Statement</span>
        </Col>
      </Row>
      <Row>
        <div>
          <Col span={8}></Col>
          <Col span={8}>
            <h3 className="subheading">{subHeading}</h3>
          </Col>
          <Col span={8}>
            <span className="date">{date}</span>
          </Col>
        </div>
      </Row>
    </Card>
  );
};

export default ListCard;

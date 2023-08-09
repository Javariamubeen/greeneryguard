import React from "react";
import { Card, Row, Col } from "antd";

const IntroCard = ({ imageUrl, heading, subHeading, date }) => {
  return (
    <Card className="card-border">
      <Row className="intro-card">
        <Col span={6}>
          <img src="https://miro.medium.com/max/576/1*Z4-6PJC2p28LAI10t7JfQw.jpeg" alt="home"/>
        </Col>
        <Col span={18}>
          <h1 className="heading">
            <span className="initial" style={{ marginRight: "10px" }}>
              ZO
            </span>
            Oragnized
          </h1>
        </Col>

        <Col  span={18}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Col>
      </Row>
    </Card>
  );
};

export default IntroCard;

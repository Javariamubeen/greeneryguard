import React, { Component } from "react";
//import { PopularProducts } from "./components/Products/Popular";
import AboutServices from "./AboutServices";
import AboutBackground from "./AboutBackground";

export default class Home extends Component {
  constructor(props) {
    super(props);

    var slides = [
      {
        title: "Garden your way towards better bushfire safety",
        description:
          "Having a fire retardant garden will shield your house from fire destruction by slowing the fire and reducing radiant heat.",
        imageUrl: "img/bg-img/1.jpg",
      },
    ];

    this.slideHtml = slides.map(function (slide, i) {
      return (
        <div className="single-hero-post bg-overlay" key={i}>
          <div
            className="slide-img bg-img"
            style={{ backgroundImage: "url(" + slide.imageUrl + ")" }}
          ></div>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="hero-slides-content text-center">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <section className="hero-area">
          <div
            className="hero-post-slides owl-carousel"
            style={{ display: "block" }}
          >
            {this.slideHtml}
          </div>
        </section>
        {/* <!-- ##### Hero Area End ##### --> */}

        {/* <!-- ##### Product Area Start ##### --> */}
        <section className="new-arrivals-products-area section-padding-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <!-- Section Heading --> */}
                <div className="section-heading text-center">
                  <h2>POPULAR PRODUCTS</h2>
                  <p>
                    We have the latest products, it must be exciting for you
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-9">
                {/* <PopularProducts /> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ##### Product Area End ##### --> */}

        <AboutServices />
        <AboutBackground />
      </div>
    );
  }
}

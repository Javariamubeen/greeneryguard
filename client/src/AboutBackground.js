import React, { Component } from "react";

export default class AboutBackground extends Component {
  render() {
    return (
      <div>
        {/* <!-- ##### About Area Start ##### --> */}
        <section className="about-us-area">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-5">
                {/* <!-- Section Heading --> */}
                <div className="section-heading">
                  <h2>ABOUT US</h2>
                  <p>
                We are a group of passionate people aiming to promote the tree retardant supply fields. As a Non Profit Organisation (NPO), we deeply care about how how bushfire could affect people's lives and property. The idea initially brought to us due to the surge of bushfires that occurred in Australia.</p>
                 <p>Founded in 2020, we aim to promote the benefits of fire retardant trees in ensuring the safety of our communities.
              </p> 
                </div>
               <img id = "about-team-image" src="img/team-image-pr.png" alt="team-image" />

                
              </div>

              <div className="col-12 col-lg-6">
                <div className="alazea-benefits-area">
                  <div className="row">
                    {/* <!-- Single Benefits Area --> */}
                    <div className="col-12 col-sm-6">
                      <div className="single-benefits-area">
                        <img src="img/core-img/b1.png" alt="" />
                        <h5>Quality Products</h5>
                        <p>
                          We are selective in choosing our sellers and the products to make sure you are satisfied with your purchase.
                        </p>
                      </div>
                    </div>

                    {/* <!-- Single Benefits Area --> */}
                    <div className="col-12 col-sm-6">
                      <div className="single-benefits-area">
                        <img src="img/core-img/b2.png" alt="" />
                        <h5>Giveback to Community</h5>
                        <p>
                            All of our profits will go back to support the communities to recover from bushfire damages.
                        </p>
                      </div>
                    </div>

                    {/* <!-- Single Benefits Area --> */}
                    <div className="col-12 col-sm-6">
                      <div className="single-benefits-area">
                        <img src="img/core-img/b3.png" alt="" />
                        <h5>Nurture Engagement</h5>
                        <p>
                        Your opinions matter! Our tree experts will answer any of your concerns. Leave us a message in our Contact page!

                        </p>
                      </div>
                    </div>

                    {/* <!-- Single Benefits Area --> */}
                    <div className="col-12 col-sm-6">
                      <div className="single-benefits-area">
                        <img src="img/core-img/b4.png" alt="" />
                        <h5>Green Network</h5>
                        <p>
                          Want to be a part of our green network? Connect to our Seller page and join the environmental-lover family!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="border-line"></div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ##### About Area End ##### --></div> */}
      </div>
    );
  }
}

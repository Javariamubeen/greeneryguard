import React, { Component } from "react";

export default class AboutServices extends Component {
  render() {
    return (
      <div>
        {/* <!-- ##### Service Area Start ##### --> */}
        <section className="our-services-area bg-gray section-padding-100-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <!-- Section Heading --> */}
                <div className="section-heading text-center">
                  <h2>OUR SERVICES</h2>
                  <p>We are dedicated to provide you the best services.</p>
                </div>
              </div>
            </div>

            <div className="row align-items-center justify-content-between">
              <div className="col-12 col-lg-5">
                <div className="alazea-service-area mb-100">
                  {/* <!-- Single Service Area --> */}
                  <div className="single-service-area d-flex align-items-center">
                    {/* <!-- Icon --> */}
                    <div className="service-icon mr-30">
                      <img src="img/core-img/s1.png" alt="" />
                    </div>
                    {/* <!-- Content --> */}
                    <div className="service-content">
                    <h5>Plants Consultation</h5>
                    <p>
                      Don't know which product is suitable for your local neighborhood? Have a chat with our expert team!
                    </p>
                  </div>
                </div>

                {/* <!-- Single Service Area --> */}
                <div className="single-service-area d-flex align-items-center">
                  {/* <!-- Icon --> */}
                  <div className="service-icon mr-30">
                    <img src="img/core-img/s2.png" alt="" />

                    </div>
                    {/* <!-- Content --> */}
                    <div className="service-content">
                      <h5>Plant Care</h5>
                      <p>
                        We ensure your tree buddy has the best care it needs. Contact us if you have any questions about your tree's condition or tips to care for it.
                      </p>
                    </div>
                  </div>

                  {/* <!-- Single Service Area --> */}
                  <div className="single-service-area d-flex align-items-center">
                    {/* <!-- Icon --> */}
                    <div className="service-icon mr-30">
                      <img src="img/core-img/s3.png" alt="" />
                    </div>
                    {/* <!-- Content --> */}
                    <div className="service-content">
                      <h5>Tree Service &amp; Trimming</h5>
                      <p>
                        We offer a range of tree trimming and removing services through our business partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="alazea-video-area bg-overlay mb-100">
                  <img src="img/bg-img/23.jpg" alt="" />
                  <a
                    href="http://www.youtube.com/watch?v=7HKoqNJtMTQ"
                    className="video-icon"
                  >
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            </div>
        </section>
        // {/* <!-- ##### Service Area End ##### --></div> */}
      </div>
    );
  }
}

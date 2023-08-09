import React, { Component } from "react";

export default class ContactDetails extends Component {
  render() {
    return (
      <div>
        {/* <!-- ##### Contact Area Info Start ##### --> */}
        <div className="contact-area-info section-padding-0-100">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              {/* <!-- Contact Thumbnail --> */}
              <div className="col-12 col-md-6">
                <div className="contact--thumbnail">
                  <img src="img/bg-img/25.jpg" alt="" />
                </div>
              </div>

              <div className="col-12 col-md-5">
                {/* <!-- Section Heading --> */}
                <div className="section-heading">
                  <h2>CONTACT US</h2>
                  <p>We are improving our services to serve you better.</p>
                </div>
                {/* <!-- Contact Information --> */}
                <div className="contact-information">
                  <p>
                    <span>Address:</span> 505 Silk Rd, New York
                  </p>
                  <p>
                    <span>Phone:</span> +1 234 122 122
                  </p>
                  <p>
                    <span>Email:</span> info.deercreative@gmail.com
                  </p>
                  <p>
                    <span>Open hours:</span> Mon - Sun: 8 AM to 9 PM
                  </p>
                  <p>
                    <span>Happy hours:</span> Sat: 2 PM to 4 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ##### Contact Area Info End ##### --></div> */}
      </div>
    );
  }
}

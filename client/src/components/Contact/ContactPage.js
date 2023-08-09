import React, { Component } from "react";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import Map from "./Map";
import BreadCrumbNCover from "../../BreadCrumbNCover";
const pageName = "Contact us";

export default class ContactPage extends Component {
  render() {
    return (
      <div>
        <BreadCrumbNCover pageName={pageName} />
        <ContactDetails />
        <section className="contact-area section-padding-100-0">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-12 col-lg-5">
                {/* <!-- Section Heading --> */}
                <div className="section-heading">
                  <h2>GET IN TOUCH</h2>
                  <p>Send us a message, we will call back later</p>
                </div>
                <ContactForm />
              </div>
              <div className="col-12 col-lg-6">
                <Map />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

import React, { Component } from "react";
import {sendEmail} from "./service";
import toastr from "toastr";

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { customerName: "", email: "", subject: "", message: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Update state when user types
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  //Send data when user submits
  async handleSubmit(evt) {
    evt.preventDefault(); //prevent the page from reloading
    await sendEmail(this.state);
    toastr.success("Email has been sent");
    //codes to send data to database
  }

  render() {
    return (
      <div>
        {/* <!-- Contact Form Area --> */}
        <div className="contact-form-area mb-100">
          <form onSubmit={this.handleSubmit} method="post">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="customerName"
                    className="form-control"
                    id="contact-name"
                    placeholder="Your Name"
                    value={this.state.customerName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="contact-email"
                    placeholder="Your Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    id="contact-subject"
                    placeholder="Subject"
                    value={this.state.subject}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className=" alazea-btn">
                  Send Message
                        </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

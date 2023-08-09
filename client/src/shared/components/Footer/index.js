import React from "react";

import "./style.less";
import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd/lib/index';
import { Subscribe } from "./service";
import toastr from 'toastr';
const FormItem = Form.Item;

const Footer = props => {
  async function SubscribeUser(body) {
    try{
    const res = await Subscribe(body);
if(res.status==201)
{
  toastr.success("Subscribed successfully<br/>Please review your email for more details.");

  if(res.status==422)
  {
   toastr.error("User already subscribed");
  }}
    }
    catch(err)
    {
      console.log("Eerror",err);
if(err.status==422)
{
  toastr.error("User already subscribed");
}
    }

  }
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        try {
          SubscribeUser(values);
          toastr.options.closeButton = true;
          //toastr.options.timeOut = 30000000; // How long the toast will display without user interaction
//toastr.options.extendedTimeOut = 6000000;
          // toastr.info("Subscribed successfully<br/>Please review your email for more details.");
          // toastr.warning("Subscribed successfully");
          // toastr.error("Subscribed successfully");
        }
        catch (err) {

        }
      }
    });
  }
  const { getFieldDecorator } = props.form;
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h3>stay connected</h3>
            <div className="news-letter">
              <span className="title">Newsletter</span>
              <Form onSubmit={(e) => handleSubmit(e)}
                className="news-letter-form text-center justify-content-center"
              >
                <label className="label text-center">
                  Email address:
                </label>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Email is required!' }],
                  })(
                    <Input className="form-control" placeholder="Your email address" />
                  )}
                </FormItem>
                <Button className='text-center' htmlType="submit">Sign UP</Button>
              </Form>
            </div>
            <ul className="social-links d-flex justify-content-center align-items-center">
              <li className="nav-item">

                <a 
                title="Mail"
                className="nav-link"
                  target="_blank"
                  href="mailto:info@zo-organized.com"
                >
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                </a>{" "}
              </li>
              <li className="nav-item">

                <a 
                title="Facebook"
                className="nav-link"
                  target="_blank"
                  href="https://www.facebook.com/zoorganized/"
                >
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>{" "}
              </li>
              <li className="nav-item">

                <a 
                title="Instagram"
                className="nav-link"
                  target="_blank"
                  href="https://www.instagram.com/zoorganized/3"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>{" "}
              </li>
              <li className="nav-item">

                <a 
                title="Pinterest"
                className="nav-link"
                  target="_blank"
                  href="https://www.pinterest.com/zoorganized/"
                >
                  <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                </a>{" "}
              </li>
              <li className="nav-item">

                <a 
                title="Twitter"
                className="nav-link"
                  target="_blank"
                  href="https://twitter.com/zo_organized">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>zo topics</h3>
            <ul className="footer-nav list-style-none m-0 p-0">
              {/* <li>
                <Link className="nav-link" to={"/app"}>
                  ZO App
                </Link>
              </li> */}
              <li>
                <Link className="nav-link" to={"/about"}>
                  About ZO
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/systems/home"}>
                  zo systems
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/zoblog"}>
                  blog
                </Link>
              </li>
              {/* <li>
                <Link className="nav-link" to={"/products"}>
                  products
                </Link>
              </li> */}
              <li>
                <Link className="nav-link" to={"/"}>
                  zo home
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="col-md-4">
            <h3>search categories</h3>
            <select>
              <option >Select category</option>
              <option>Select category 1</option>
              <option>Select category 2</option>
              <option>Select category 3</option>
            </select>
          </div> */}
        </div>
      </div>
      {/*<Footer>© 2019 ZO Organized</Footer>*/}
    </footer>
  );
};
const FooterForm = Form.create()(Footer);
export default FooterForm;

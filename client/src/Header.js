import React, { Component,useState, useContext,useRef, useEffect } from "react";
import NavBar from "./shared/components/Navbar/NavBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CART } from './shared/modules/Enums/cartEnums';
import { AuthContext } from "./shared/components/Context/AuthContext/AuthContext";
import Context from "./Context";
const Header =()=> {
  const { state, dispatch } = useContext(Context);
  const[Token,setToken]=useState();
  const authContext = useContext(AuthContext);
  //   useEffect(() => {
//     async function fetchData() {

//     }
//     fetchData();
// }, []);

  function addQuantity(_id) {
    dispatch({ type: CART.ADD_QUANTITY, _id });
  }
  function subtractQuantity(_id) {
    dispatch({ type: CART.SUBTRACT_QUANTITY, _id });
  }

  function logout() {
    authContext.logoutUser();
    window.location = '/login';
  }

  return (
      <header className="header-area" style={{
                  marginBottom:"4rem"
                }}>
        {/* <!-- ***** Top Header Area ***** --> */}
        <div className="top-header-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="top-header-content d-flex align-items-center justify-content-between">
                  {/* <!-- Top Header Content --> */}
                  <div className="top-header-meta">
                  </div>
                  {/* <!-- Top Header Content --> */}
                  <div className="top-header-meta d-flex">
                    {/* <!-- Login --> */}
                    <div className="login">
                      {authContext.checkAuthentication()?<a style={{width: "80px",borderRadius: "3px",letterSpacing: "1.5px" ,color:"white"}} onClick={()=>logout()}>Logout</a>:<Link to="/login" style={{width: "80px",borderRadius: "3px",letterSpacing: "1.5px"}}>Log In</Link>}
                    </div>
                    <div className="profile">
                      {authContext.checkAuthentication()?<Link to="/profile" style={{width: "80px",borderRadius: "3px",letterSpacing: "1.5px"}}>Profile</Link>:""}
                    </div>

                    {
                      !authContext.checkAuthentication() ?
                          <div className="register">
                            <Link
                                to="/register"
                                style={{
                                  width: "40px",

                                  borderRadius: "3px",
                                  letterSpacing: "1.5px"
                                }}

                            >
                              Register
                            </Link>
                          </div>
                          : ''
                    }
                    <div className="cart">
                      <Link to="/cart">
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                        <span>
                          Cart
                          <span className="cart-quantity">
                            ({state && state.addedItems && state.addedItems.length})
                          </span>
                        </span>
                      </Link>
                    </div>
					
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavBar />
      </header>
	  	
    );
  }

// const mapStateToProps = (state) => {
//   return {
//     items: state.carts.items,
//   };
// };

export default Header;

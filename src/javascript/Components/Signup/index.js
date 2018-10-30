import React, {Component} from 'react'
import Form from "./Form"
import Footer from "../../Components/Layout/Footer"
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import '../../../stylesheets/login-signup.css'

export default class Signup extends Component {
  render() {
    return (
      <div id="layout">
        <header id="header_outer">
          <div class="container">
            <div class="header_section">
              <div class="is-account-present">
                Already Having Account?
                <Link to="/login" class="already-account-present-link">LogIn</Link>
              </div>
              <a class="res-nav_click animated wobble wow" href="javascript:void(0)">
                <i class="fa-bars"></i>
              </a>
            </div>
          </div>
        </header>
        <section id="top_content" class="top_cont_outer">
          <div class="container">
            <div class="login_content">
              <div class="row">
                <div class="col-lg-6 col-sm-6 col-md-offset-3">
                  <div class="top_leght_cont flipInY wow animated">
                    <h2>SIGNUP</h2>
                    <div class="form">
                      <Form/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}

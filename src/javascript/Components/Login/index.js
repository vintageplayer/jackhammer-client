import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Form from "./Form"
import Footer from "../../Components/Layout/Footer"
import '../../../stylesheets/login-signup.css'

export default class Login extends Component {
  render() {
    return (
      <div id="layout">
        <header id="header_outer">
          <div class="container">
            <div class="header_section">
              <nav class="home-nav home-left-nav" id="nav">
                <ul class="">
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                </ul>
              </nav>
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
                    <h2>Login</h2>
                    <div class="form">
                      <Form/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-2"></div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}

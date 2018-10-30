import React from 'react';

export default class Contact extends React.Component {
  render() {
    return (
      <div class="footer_section" id="contact">
        <section class="main-section contact" id="contact">
          <div class="contact_section">
            <h2>Contact Us</h2>
            <div class="row">
              <div class="col-lg-4">
                <div class="contact_block">
                  <div class="contact_block_icon rollIn animated wow">
                    <span>
                      <i class="fa-home"></i>
                    </span>
                  </div>
                  <span class="ola-address">
                    8/2A,8/2B, Embassy Golf Links Business Park, Domlur, Bengaluru, Karnataka 560071
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="contact_block">
                  <div class="contact_block_icon icon2 rollIn animated wow">
                    <span>
                      <i class="fa-phone"></i>
                    </span>
                  </div>
                  <span>
                    080-67350900
                  </span>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="contact_block">
                  <div class="contact_block_icon icon3 rollIn animated wow">
                    <span>
                      <i class="fa-pencil"></i>
                    </span>
                  </div>
                  <span>
                    <a href="mailto:jackhammer@olacabs.com">
                      jackhammer@olacabs.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 wow fadeInLeft">
              <div class="contact-info-box address clearfix">
                <h3>Don’t be shy. Say hello!</h3>
                <p>
                  If you haven't found what you are looking for, we'll be happy to personally help you. Please fill out this form and we'll be in touch with a solution soon.
                </p>
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp delay-06s">
              <div class="form">
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage"></div>
                <form action="" method="post" role="form" class="contactForm">
                  <div class="form-group">
                    <input type="text" name="name" class="form-control input-text" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control input-text" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control input-text" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                    <div class="validation"></div>
                  </div>
                  <button type="submit" class="btn input-btn">SEND MESSAGE</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

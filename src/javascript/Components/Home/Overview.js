import React from 'react';
const imgStyles = {
  width: "100%"
}
export default class Overview extends React.Component {
  render() {
    return (
      <section id="top_content" class="top_cont_outer">
        <div class="top_cont_inner">
          <div class="top_content">
            <div class="row">
              <div class="col-xs-5">
                <div class="top_left_cont flipInY wow animated">
                  <h2>Overview</h2>
                  <p>
                    Jackhammer is a collaboration tool built with the aim of bridging the gap between security teams, developer teams, and QA teams, and being the facilitator for TPM to understand and track the quality of the code going into production
                  </p>
                </div>
              </div>
              <div class="col-xs-7">
                <img src="/images/new_dashboard_1.png" class="img-responsive" style={imgStyles}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

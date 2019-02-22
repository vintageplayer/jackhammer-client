import React from 'react';
const imgStyles = {
  width: "100%"
}
export default class HowItWorks extends React.Component {
  render() {
    return (
      <section id="work_outer">
        <div class="top_cont_latest">
          <div class="container">
            <h2>Latest Work</h2>
            <div class="work_section">
              <div class="row">
                <div class="col-xs-1"></div>
                <div class="col-xs-5 wow fadeInLeft delay-05s">
                  <div class="service-list">
                    <div class="service-list-col1">
                      <i class="icon-doc"></i>
                    </div>
                    <div class="service-list-col2">
                      <h3>
                        Simplifying integrations and upgrades
                      </h3>
                      <p>
                        Compatibility issues are addressed in jackhammer sdk hence the tool and its developer needs to understand a very minimal set of jackhammer nuances, To get the tool compatible with jackhammer once done the rest is taken care by the suite.
                      </p>
                    </div>
                  </div>
                  <div class="service-list">
                    <div class="service-list-col1">
                      <i class="icon-comment"></i>
                    </div>
                    <div class="service-list-col2">
                      <h3>
                        Avoiding dependency conflicts
                      </h3>
                      <p>
                        Jackhammer runs every tool in its own sandbox so every tools is having its own set of dependencies and not worried about the rest of the tool environments.
                      </p>
                    </div>
                  </div>
                  <div class="service-list">
                    <div class="service-list-col1">
                      <i class="icon-database"></i>
                    </div>
                    <div class="service-list-col2">
                      <h3>
                        Horizontal Scaling Tools
                      </h3>
                      <p>
                        Upgrades are as good as adding another tool to jackhammer Multiple version of same tools need to be there no problem the isolation of jackhammer makes it possible.
                      </p>
                    </div>
                  </div>
                  <div class="service-list">
                    <div class="service-list-col1">
                      <i class="icon-cog"></i>
                    </div>
                    <div class="service-list-col2">
                      <h3>
                        Enabling easy upgrades.
                      </h3>
                      <p>
                        Upgrades are as good as adding another tool to jack hammer Multiple version of same tools need to be there no problem the isolation of jackhammer makes it possible.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xs-5 text-right wow fadeInUp delay-02s">
                  <img src="/images/new_dashboard_1.png" class="img-responsive" style={imgStyles}/>
                </div>
                <div class='col-xs-1'/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

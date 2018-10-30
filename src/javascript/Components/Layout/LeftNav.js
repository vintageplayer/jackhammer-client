import React, {Component} from 'react'
import Footer from './Footer'
import localStorage from 'localStorage'
import * as TaskActions from '../../Actions/TaskActions'
import * as scanTypeActions from '../../Actions/ScanTypeActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../../../stylesheets/skin-blue.css'
import '../../../stylesheets/admin.css'

const getActionClass = (index) => {
  if (index == 0)
    return "treeview active";
  return "treeview";
}

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pageLoaded: false,
    };
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this
        .props
        .actions
        .fetchAllTasks({limit: -1});
    }
    if (typeof jQuery === "undefined") {
      throw new Error("LeftSlider requires jQuery");
    }

    'use strict';
    $.LeftSlider = {};
    $.LeftSlider.options = {
      //Add slimscroll to navbar menus
      //This requires you to load the slimscroll plugin
      //in every page before app.js
      navbarMenuSlimscroll: true,
      navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
      navbarMenuHeight: "200px", //The height of the inner menu
      //Sidebar push menu toggle button selector
      sidebarToggleSelector: "[data-toggle='offcanvas']",
      //Activate sidebar push menu
      sidebarPushMenu: true,
      //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
      sidebarSlimScroll: true,
      //BoxRefresh Plugin
      enableBoxRefresh: true,
      //Bootstrap.js tooltip
      enableBSToppltip: true,
      BSTooltipSelector: "[data-toggle='tooltip']",
      //Enable Fast Click. Fastclick.js creates a more
      //native touch ecperience with touch devices. If you
      //choose to enable the plugin, make sure you load the script
      //before LeftSlider's app.js
      enableFastclick: true,
      //Box Widget Plugin. Enable this plugin
      //to allow boxes to be collapsed and/or removed
      enableBoxWidget: true,
      //Box Widget plugin options,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    };

    /* ------------------
     * - Implementation -
     * ------------------
     * The next block of code implements LeftSlider's
     * functions and plugins as specified by the
     * options above.
     */
    $(function() {
      //Easy access to options
      var o = $.LeftSlider.options;

      //Activate the layout maker
      $
        .LeftSlider
        .layout
        .activate();

      //Enable sidebar tree view controls
      $
        .LeftSlider
        .tree('.left-sidebar');
      //Add slimscroll to navbar dropdown
      if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
        $(".navbar .menu")
          .slimscroll({height: "200px", alwaysVisible: false, size: "3px"})
          .css("width", "100%");
      }

      //Activate sidebar push menu
      if (o.sidebarPushMenu) {
        $
          .LeftSlider
          .pushMenu(o.sidebarToggleSelector);
      }

      //Activate Bootstrap tooltip
      if (o.enableBSToppltip) {
        // $(o.BSTooltipSelector).tooltip();
      }

      if (o.enableFastclick && typeof FastClick != 'undefined') {
        // FastClick.attach(document.body);
      }
    });

    /* ----------------------
     * - LeftSliderFunctions -
     * ----------------------
     * All LeftSlider functions are implemented below.
     */

    /* prepareLayout
     * =============
     * Fixes the layout height in case min-height fails.
     *
     * @type Object
     * @usage $.LeftSlider.layout.activate()
     *        $.LeftSlider.layout.fix()
     *        $.LeftSlider.layout.fixSidebar()
     */
    $.LeftSlider.layout = {
      activate: function() {
        var _this = this;
        _this.fix();
        _this.fixSidebar();
        $(window, ".wrapper").resize(function() {
          _this.fix();
          _this.fixSidebar();
        });
      },
      fix: function() {
        //Get window height and the wrapper height
        // var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
        // var window_height = $(window).height();
        // var sidebar_height = $(".left-sidebar").height();
        // //Set the min-height of the content and sidebar based on the
        // //the height of the document.
        // if ($("body").hasClass("fixed")) {
        //   $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
        // } else {
        //   if (window_height >= sidebar_height) {
        //     $(".content-wrapper, .right-side").css('min-height', window_height - neg);
        //   } else {
        //     $(".content-wrapper, .right-side").css('min-height', sidebar_height);
        //   }
        // }
      },
      fixSidebar: function() {
        //Make sure the body tag has the .fixed class
        if (!$("body").hasClass("fixed")) {
          if (typeof $.fn.slimScroll != 'undefined') {
            $(".left-sidebar")
              .slimScroll({destroy: true})
              .height("auto");
          }
          return;
        } else if (typeof $.fn.slimScroll == 'undefined' && console) {
          console.error("Error: the fixed layout requires the slimscroll plugin!");
        }
        // Enable slimscroll for fixed layout
        if ($.LeftSlider.options.sidebarSlimScroll) {
          // if (typeof $.fn.slimScroll != 'undefined') {
          //   //Distroy if it exists
          //   $(".left-sidebar")
          //     .slimScroll({destroy: true})
          //     .height("auto");
          //   //Add slimscroll
          //   $(".left-sidebar").slimscroll({
          //     height: ($(window).height() - $(".main-header").height()) + "px",
          //     color: "rgba(0,0,0,0.2)",
          //     size: "3px"
          //   });
          // }
        }
      },
    };

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     */
    $.LeftSlider.pushMenu = function(toggleBtn) {
      //Enable sidebar toggle
      $(toggleBtn)
        .click(function(e) {
          e.preventDefault();
          //Enable sidebar push menu
          $("body").toggleClass('sidebar-collapse');
          $("body").toggleClass('sidebar-open');
        });
      $(".content-wrapper").click(function() {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     */
    $.LeftSlider.tree = function(menu) {
      $("li a", $(menu))
        .click(function(e) {
          //Get the clicked link and the next element
          var $this = $(this);
          var checkElement = $this.next();

          //Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
            //Close the menu
            checkElement
              .slideUp('normal', function() {
                checkElement.removeClass('menu-open');
              });
            checkElement
              .parent("li")
              .removeClass("active" //If the menu is not visible
              );
          } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this
              .parents('ul')
              .first();
            //Close all open menus within the parent
            var ul = parent
              .find('ul:visible')
              .slideUp('normal');
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown('normal', function() {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent
                .find('li.active')
                .removeClass('active');
              parent_li.addClass('active');
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.authenticated) {
  //     this
  //       .props
  //       .actions
  //       .fetchAllTasks({limit: -1});
  //   }
  // }

  getActionClass(index) {
    if (index == 0)
      return "treeview active";
    return "treeview";
  }
  renderActions(actions) {
    if (actions.length === 0)
      return null;
    return (actions.map(function(action, index) {
      if (action.tasks.length === 0)
        return null;
      return (
        <li key={index} class={getActionClass(index)}>
          <a href="#">
            <i class={action.iconClass}></i>
            <span>{action.name}</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            {action
              .tasks
              .map(function(task) {
                return (
                  <li key={task.id}>
                    <Link to={task.taskRoute}>
                      {task.name}
                    </Link>
                  </li>
                )
              })
}
          </ul>
        </li>
      )
    }));
  }

  render() {
    const {fetchedTasks} = this.props;
    return (
      <aside class="main-sidebar">
        <section class="sidebar left-sidebar">
          <ul class="sidebar-menu">
            {this.renderActions(fetchedTasks)}
          </ul>
        </section>
      </aside>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, scanTypeActions, TaskActions), dispatch)
  };
}
const mapStateToProps = (state) => ({fetchedTasks: state.tasks.fetchedTasks, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)

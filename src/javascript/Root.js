import React, {Component} from 'react'
import {Switch} from 'react-router'
import {BrowserRouter as Router, browserHistory, Link,} from 'react-router-dom'
import Route from 'react-router-dom/Route'
//applicaiton components
import requireAuthentication from './Components/Auth/RequireAuth'
import Home from './Components/Home'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Signup from './Components/Signup'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ForgotPassword/ResetPassword'
import ChangePassword from './Containers/ChangePassword'
import Layout from './Components/Layout'
import Dashboard from './Containers/Dashboard'
import ExecutiveDashboard from './Containers/Dashboard/ExecutiveDashboard'
import Scans from './Containers/Scans'
import CreateScan from './Containers/Scans/Create'
import Applications from './Containers/Applications'
import Repos from './Containers/Repos'
import repoSummary from './Containers/ReposFinding'
import repoFindings from './Containers/ReposFinding/repoFindings'
import repoVulnerabilityTrend from './Containers/ReposFinding/RepoCharts'
import toolResults from './Containers/ReposFinding/ToolResults'
import Analytics from './Containers/Analytics'
import Filters from './Containers/Filters'
import Users from './Containers/Users'
import EditUser from './Containers/Users/Edit'
import Groups from './Containers/Groups'
import CreateGroup from './Containers/Groups/Create'
import EditGroup from './Containers/Groups/Edit'
import Roles from './Containers/Roles'
import CreateRole from './Containers/Roles/Create'
import EditRole from './Containers/Roles/Edit'
import Permissions from './Containers/Permissions'
import CreatePermission from './Containers/Permissions/Create'
import EditPermission from './Containers/Permissions/Edit'
import ScanTypes from './Containers/ScanTypes'
import newScanType from './Containers/ScanTypes/Create'
import EditScanType from './Containers/ScanTypes/Edit'
import Tools from './Containers/Tools'
import CreateTool from './Containers/Tools/Create'
import EditTool from './Containers/Tools/Edit'
import signupRoleConfiguration from './Containers/DefaultRole'
import hardcodeSecretsConfiguration from './Containers/HardCodeSecrets'
import severityLevelConfiguration from './Containers/SeverityLevel'
import Jira from './Containers/Jira'
import Git from './Containers/Git'
import ConfigureMails from './Containers/ConfigureMails'
import SMTPSettings from './Containers/SMTPSettings'
import Findings from './Containers/Findings'
import findingDetail from './Containers/Findings/FindingDetail'
import NotFound from './Components/NotFound'
//botstrap inclusion
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/forgot_password" component={ForgotPassword}/>
          <Route path="/reset_password/:passwordToken?" component={ResetPassword}/>
          <Route path="/not_found" component={NotFound}/>
          <Layout>
            <Route exact path="/change_password" name="ChangePassword" component={requireAuthentication(ChangePassword)}/>
            <Route path="/excutive_dashboard/:ownerType/:scanType" component={requireAuthentication(ExecutiveDashboard)}/>
            <Route path="/dashboard/:ownerType/:scanType" component={requireAuthentication(Dashboard)}/>
            <Route path="/scans/:ownerType/:scanType" component={requireAuthentication(Scans)}/>
            <Route path="/add_scan/:ownerType/:scanType" component={requireAuthentication(CreateScan)}/>
            <Route path="/applications/:ownerType/:scanType" component={requireAuthentication(Applications)}/>
            <Route path="/repos/:ownerType/:scanType/:group?" component={requireAuthentication(Repos)}/>
            <Route path="/repo_vulnerability_trend/:ownerType/:scanType?/:group?" component={requireAuthentication(repoSummary)}/>
            <Route path="/repo_findings/:ownerType/:scanType?/:group?" component={requireAuthentication(repoFindings)}/>
            <Route path="/tool_results/:ownerType/:scanType?/:group?" component={requireAuthentication(toolResults)}/>
            <Route path="/analytics/:ownerType" component={requireAuthentication(Analytics)}/>
            <Route path="/filters/:ownerType/:scanType?" component={requireAuthentication(Filters)}/>
            <Route path="/users" component={requireAuthentication(Users)}/>
            <Route path="/edit_user/:id" component={requireAuthentication(EditUser)}/>
            <Route path="/groups" component={requireAuthentication(Groups)}/>
            <Route path="/add_group" component={requireAuthentication(CreateGroup)}/>
            <Route path="/edit_group/:id" component={requireAuthentication(EditGroup)}/>
            <Route path="/roles" component={requireAuthentication(Roles)}/>
            <Route path="/add_role" name="roles-creation" component={requireAuthentication(CreateRole)}/>
            <Route path="/edit_role/:id" component={requireAuthentication(EditRole)}/>
            <Route path="/permissions" component={requireAuthentication(Permissions)}/>
            <Route path="/add_permission" component={requireAuthentication(CreatePermission)}/>
            <Route path="/edit_permission/:id" component={requireAuthentication(EditPermission)}/>
            <Route path="/scan_types" component={requireAuthentication(ScanTypes)}/>
            <Route path="/create_scan_type" component={requireAuthentication(newScanType)}/>
            <Route path="/edit_scan_type/:id" component={requireAuthentication(EditScanType)}/>
            <Route path="/tools" component={requireAuthentication(Tools)}/>
            <Route path="/add_tool" component={requireAuthentication(CreateTool)}/>
            <Route path="/edit_tool/:id" component={requireAuthentication(EditTool)}/> {/* <Route path="/severity_level_configuration" component={requireAuthentication(severityLevelConfiguration)}/> */}
            <Route path="/signup_role_configuration" component={requireAuthentication(signupRoleConfiguration)}/>
            <Route path="/hardcode_secrets_configuration" component={requireAuthentication(hardcodeSecretsConfiguration)}/>
            <Route path="/jira" component={requireAuthentication(Jira)}/>
            <Route path="/git" component={requireAuthentication(Git)}/>
            <Route path="/configure_mail" component={requireAuthentication(ConfigureMails)}/>
            <Route path="/smtp_settings" component={requireAuthentication(SMTPSettings)}/>
            <Route path="/findings/:scan" component={requireAuthentication(Findings)}/>
            <Route path="/finding_detail/:parentId/:id" component={requireAuthentication(findingDetail)}/>
          </Layout>
        </Switch>
      </Router>
    )
  }
};

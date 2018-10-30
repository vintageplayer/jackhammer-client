import {combineReducers} from "redux"
import users from "./UsersReducer"
import groups from "./GroupsReducer"
import roles from "./RolesReducer"
import permissions from "./PermissionsReducer"
import repos from "./RepoReducer"
import scans from "./ScansReducer"
import scheduleTypes from "./ScheduleTypesReducer"
import auth from "./AuthReducer"
import findings from "./FindingReducer"
import comments from "./CommentReducer"
import uploads from "./UploadReducer"
import tags from "./TagReducer"
import tools from "./ToolsReducer"
import languages from "./LanguagesReducer"
import scanTypes from "./ScanTypesReducer"
import filters from "./FiltersReducer"
import actions from "./NavigationsReducer"
import tasks from "./TasksReducer"
import git from "./GitReducer"
import smtp from "./SMTPReducer"
import jira from "./JiraReducer"
import defaultRole from "./DefaultRoleReducer"
import hardcodeSecrets from "./HardcodeSecretReducer"
import severityLevels from "./SeverityLevelsReducer"
import dashboard from "./DashboardReducer"
import analytics from "./AnalyticsReducer"
import applications from "./ApplicationsReducer"
import resetPassword from "./ResetPasswordReducer"
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  auth,
  users,
  groups,
  roles,
  scans,
  scheduleTypes,
  permissions,
  repos,
  findings,
  comments,
  uploads,
  tags,
  tools,
  languages,
  scanTypes,
  filters,
  actions,
  tasks,
  git,
  smtp,
  jira,
  defaultRole,
  hardcodeSecrets,
  severityLevels,
  dashboard,
  analytics,
  applications,
  resetPassword,
  toastr: toastrReducer,
})

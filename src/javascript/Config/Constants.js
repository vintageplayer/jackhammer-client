var config = require("json-loader!yaml-loader!../AppConfig/config.yml");
export const UNAUTH_BASE_URL = config.SERVER_CONFIG.SERVER_HOST + '/api/v1/';
export const AUTH_BASE_URL = config.SERVER_CONFIG.SERVER_HOST + '/api/v1/app/';
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};
// export const CLIENT_URL = 'http://jackhammer-client-8080.stg.corp.olacabs.com';

//OWNER TYPES
export const PERSONAL = "Personal";
export const TEAM = "Team";
export const CORPORATE = "Corporate";

//SCAN TYPES
export const SOURCE_CODE = "Source Code";
export const WEB = "Web";
export const MOBILE = "Mobile";
export const NETWORK = "Network";
export const WORDPRESS = "Wordpress";
export const HARDCODED_SECRET = "Hardcoded Secret";

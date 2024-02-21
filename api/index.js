import getConfig from 'next/config'

const {publicRuntimeConfig,serverRuntimeConfig} = getConfig()
const {BASE_PATH,AUTHORISATION} = publicRuntimeConfig
// console.log("publicRuntimeConfig",publicRuntimeConfig);
export default (() => {
  return {

    LOGIN: BASE_PATH+"/v1/user/login",
    FORGOT: BASE_PATH+"/v1/user/forgot",
    RESET: BASE_PATH+"/v1/user/reset",
    CHANGE_PASSWORD: BASE_PATH+"/v1/user/changePassword",

    USER_DETAILS: BASE_PATH + "/v1/user/details",

  };
})();

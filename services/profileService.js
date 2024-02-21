import axios from "axios";

import Api from "../api";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig()
const {BASE_PATH,AUTHORISATION} = publicRuntimeConfig

const headers= {
    'Content-Type': 'application/json',
    'Authorization': AUTHORISATION
}

async function profileLog(params) {
  let response = await axios({
        method: "post",
        url:  Api.PROFILE_LOG,
        data: params,
        headers:headers,
    })
  return response.data;
}



export const profileService = {
    profileLog,
};

// import md5 from "blueimp-md5";
import _ from "lodash";
import {
  AUTH_LOGIN,
  AUTH_CHECK,
  AUTH_LOGOUT
} from "admin-on-rest";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const {
      username,
      password
    } = params;
    // let passwordWithPublicKey = password + appConfig.app_security_public_key;

    const paramRequest = {
      username,
      grant_type: "password",
      password: password
    };

    const searchParams = Object.keys(paramRequest).map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(paramRequest[key]);
    }).join("&");


    const request = new Request("oauth/token", {
      method: "POST",
      body: searchParams,
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic YXBwbGljYXRpb246c2VjcmV0"
      }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {

        if (!response.access_token) {
          throw new Error(response.data);
        }

        localStorage.setItem("token", response.access_token);
      });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    if(_.isEmpty(localStorage.getItem("token"))){
      return Promise.reject();
    }

    return Promise.resolve();
  }

  return Promise.resolve();
};
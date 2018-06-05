import appConfig from "../configs/App.config";

const getCodeTypeForm = () => {
  const requestCodeURL = `${appConfig.type_form_end_point_api}/oauth/authorize?client_id=${appConfig.type_form_client_id}&redirect_uri=${appConfig.type_form_redirect_uri}&scope=responses:read`;
  window.location.replace(requestCodeURL);
};

export const fetchDataFromTypeForm = () => {
  getCodeTypeForm();
};

export const getAccessToken = (code) => {
  const url = `${appConfig.type_form_end_point_api}/oauth/token`;

  const params = {
    client_id: appConfig.type_form_client_id,
    client_secret: appConfig.type_form_client_secret,
    redirect_uri: appConfig.type_form_redirect_uri,
    code: code,
  };

  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
  }).join("&");

  const request = new Request(url , {
    method: "POST",
    body: searchParams,
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    }),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    });
};

export const getDataFromTypeForm = (accessToken) => {
  const url = `${appConfig.type_form_end_point_api}/forms/${appConfig.type_form_form_id}/responses`;
  const request = new Request(url, {
    method: "GET",
    headers: new Headers({
      "Authorization": `bearer ${accessToken}`
    }),
  });

  return fetch(request).then(response => {
    return response.json();
  });
};


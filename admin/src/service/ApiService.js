import { userLogout } from "admin-on-rest";

export const callAPIOverview = (dispatch) => {
  const request = new Request("admin/get_overview_information?to_day=true", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  });

  return fetch(request).then(response => {
    if (response.status == 401) {
      dispatch(userLogout());
    }

    if (response.status < 200 || response.status >= 300) {
      return {};
    }

    return response.json();
  });
};

export const callAPIKYCConfirmation = (contributionID, dispatch) => {
  const request = new Request("admin/kyc_confirmation", {
    method: "POST",
    body: JSON.stringify({contributor_id: contributionID}),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  });

  return fetch(request).then(response => {
    if (response.status == 401) {
      dispatch(userLogout());
    }

    if (response.status < 200 || response.status >= 300) {
      return {};
    }

    return response.json();
  });
};

export const callAPIUpdateContribution = (contribution, dispatch) => {
  const request = new Request(`admin/contributor/${contribution.id}`, {
    method: "PUT",
    body: JSON.stringify(contribution),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  });

  return fetch(request).then(response => {
    if (response.status == 401) {
      dispatch(userLogout());
    }

    if (response.status < 200 || response.status >= 300) {
      return {};
    }
    return response.json();
  });
};

export const importDataForContribute = (accessToken, formID, dispatch) => {
  const request = new Request("admin/import_from_type_form", {
    method: "POST",
    body: JSON.stringify({access_token_type_form: accessToken, form_id: formID}),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  });

  return fetch(request).then(response => {
    if (response.status == 401) {
      dispatch(userLogout());
    }

    if (response.status < 200 || response.status >= 300) {
      return {};
    }
    return response.json();
  });
};

export const importDataForPreOrder = (accessToken, formID, dispatch) => {
  const request = new Request("admin/import_from_type_form_for_preorder", {
    method: "POST",
    body: JSON.stringify({access_token_type_form: accessToken, form_id: formID}),
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  });

  return fetch(request).then(response => {
    if (response.status == 401) {
      dispatch(userLogout());
    }

    if (response.status < 200 || response.status >= 300) {
      return {};
    }

    return response.json();
  });
};
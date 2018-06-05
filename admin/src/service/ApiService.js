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
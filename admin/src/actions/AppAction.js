import { callAPIOverview } from "../service/ApiService";
import AppConstant from "../constants/AppConstant";
import _ from "lodash";

export const getOverviewIndex = dispatch => {
  callAPIOverview(dispatch).then((response) => {
    if(_.isEmpty(response.data)) {
      return;
    }
    dispatch({
      type: AppConstant.GET_OVER_VIEW_INDEX,
      payload: response.data
    });
  });
};
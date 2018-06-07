var express = require("express")
var router = express.Router()

router.success = (res, data, responseCode=200) => {
  return res.json({
    status: "success",
    data,
    code: responseCode
  })
}
router.fail = (res, message, responseCode=400) => {
  return res.json({
    status: "fail",
    data: message,
    code: responseCode
  })
}
module.exports = router
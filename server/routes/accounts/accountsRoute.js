const express = require('express');
const {
    accountRegisterCtrl,
    accountAllCtrl,
    accountSingleCtrl,
    accountUpdateCtrl,
    accountDeleteCtrl
} = require('../../controllers/accounts/accountsCtrl');
const isLogin = require('../../middlewares/isLogin');
const accountRouter = express.Router();

//POST/api/v1/accounts
accountRouter.post("/", isLogin, accountRegisterCtrl);

//GET/api/v1/accounts
accountRouter.get("/", isLogin, accountAllCtrl);

//GET/api/v1/accounts/:id
accountRouter.get("/:id", isLogin, accountSingleCtrl);

//PUT/api/v1/accounts/:id
accountRouter.put("/:id", isLogin, accountUpdateCtrl);

//DELETE/api/v1/accounts/:id
accountRouter.delete("/:id", isLogin, accountDeleteCtrl);

module.exports = accountRouter;
const express = require('express');
const {
    transactionRegisterCtrl,
    transactionAllCtrl,
    transactionSingleCtrl,
    transactionUpdateCtrl,
    transactionDeleteCtrl
} = require('../../controllers/transactions/transactionsCtrl');
const isLogin = require('../../middlewares/isLogin');
const transactionRouter = express.Router();

//POST/api/v1/transactions
transactionRouter.post("/", isLogin, transactionRegisterCtrl);

//GET/api/v1/transactions
transactionRouter.get("/", isLogin, transactionAllCtrl);

//GET/api/v1/transactions
transactionRouter.get("/:id", isLogin, transactionSingleCtrl);

//PUT/api/v1/transactions
transactionRouter.put("/:id", isLogin, transactionUpdateCtrl);

//DELETE/api/v1/transactions
transactionRouter.delete("/:id", isLogin, transactionDeleteCtrl);

module.exports = transactionRouter;
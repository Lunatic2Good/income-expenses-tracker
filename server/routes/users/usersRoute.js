const express = require('express')
const userController = require('../../controllers/users/usersCtrl');
const isLogin = require('../../middlewares/isLogin');
const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post("/register", userController.userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userController.userLoginCtrl);

//GET/api/v1/users/profile/:id
userRouter.get("/profile", isLogin, userController.userProfileCtrl);

//PUT/api/v1/users/profile/:id
userRouter.put("/profile", isLogin, userController.userUpdateCtrl);

//DELETE/api/v1/users/profile/:id
userRouter.delete("/", isLogin, userController.userDeleteCtrl);

module.exports = userRouter;
const express = require('express');
require('./config/dbConnect');
const userRouter = require('./routes/users/usersRoute');
const accountRouter = require('./routes/accounts/accountsRoute');
const transactionRouter = require('./routes/transactions/transactionsRoute');
const globalErrHandler = require('./middlewares/globalErrHandler');
const app = express();

//middlewares----------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes---------------------------------------------------------------
//users route
app.use("/api/v1/users", userRouter);

//account route //(project)
app.use("/api/v1/accounts", accountRouter);

//transactions route
app.use("/api/v1/transactions", transactionRouter);

//Error handlers-------------------------------------------------------
app.use(globalErrHandler);

//listen to server-----------------------------------------------------
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is up and listening on port ${port}!`))
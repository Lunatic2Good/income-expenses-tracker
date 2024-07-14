const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");

const transactionRegisterCtrl = async (req, res, next) => {
    const { name, transactionType, amount, category, color, notes, account } = req.body;
    try {
        //1. Find user
        const userFound = await User.findById(req.user);
        if(!userFound)
            return next(new AppErr("User not Found", 404));
        //2. Find the account
        const accountFound = await Account.findById(account);
        if(!accountFound)
            return next(new AppErr("Account not Found", 404));
        //3. Create the transaction
        const transaction = await Transaction.create({
            name,
            transactionType,
            amount,
            category,
            notes,
            createdBy: req.user
        });
        //4. Push the transaction to the account
        accountFound.transactions.push(transaction._id);
        //5. Resave the account
        await accountFound.save();
        res.json({
            userFound,
            accountFound,
            transaction
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const transactionAllCtrl =  async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(201).json({
            transactions
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const transactionSingleCtrl = async (req, res, next) => {
    try {
        //find the id from params
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        res.status(201).json({
            transaction
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const transactionUpdateCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            transaction
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const transactionDeleteCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(201).json({
            message: "transaction deleted successfully"
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

module.exports = {
    transactionRegisterCtrl,
    transactionAllCtrl,
    transactionSingleCtrl,
    transactionUpdateCtrl,
    transactionDeleteCtrl
};
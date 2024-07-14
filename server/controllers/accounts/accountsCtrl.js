const Account = require("../../model/Account");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");

const accountRegisterCtrl = async (req, res, next) => {
    const { name, accountType, initialBalance, notes } = req.body;
    try {
        if(!name || !accountType || !notes)    
            return next(new AppErr("All Fields are required", 400));
        //1. Find the logged in user
        const userFound = await User.findById(req.user);
        if(!userFound)
            return next(new AppErr("User not Found", 404));
        //2. Create the account
        const account = await Account.create({
            name,
            accountType,
            notes,
            createdBy: req.user
        });
        //3. Push the accounts into users accounts field
        userFound.accounts.push(account._id);
        //4. Resave the user
        await userFound.save();
        res.status(201).json({
            userFound,
            account
        });
        res.json("create account route");
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const accountAllCtrl = async (req, res, next) => {
    try {
        const accounts = await Account.find().populate('transactions');
        res.status(201).json({
            accounts
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const accountSingleCtrl = async (req, res, next) => {
    try {
        //find the id from params
        const { id } = req.params;
        const account = await Account.findById(id).populate("transactions");
        res.status(201).json({
            account
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const accountUpdateCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            account
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

const accountDeleteCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Account.findByIdAndDelete(id);
        res.status(201).json({
            message: "account deleted successfully"
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

module.exports = {
    accountRegisterCtrl,
    accountAllCtrl,
    accountSingleCtrl,
    accountUpdateCtrl,
    accountDeleteCtrl
};
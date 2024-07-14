const User = require("../../model/User");
const bcrypt = require('bcryptjs');
const { appErr, AppErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");

exports.userRegisterCtrl = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        if(!fullname || !email || !password)    
            return next(new AppErr("All Fields are required", 400));
        const userFound = await User.findOne({ email });
        if(userFound)
            return next(appErr("User already exist", 400));
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullname,
            email,
            password: hashPassword
        });
        res.status(201).json({
            user: {
              id: user._id,
              fullname: user.fullname,
              email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

exports.userLoginCtrl = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if(!email || !password)    
            return next(new AppErr("All Fields are required", 400));
        const userFound = await User.findOne({ email });
        if(!userFound)
            return next(new AppErr("Invalid Credentials", 400));
        const match = await bcrypt.compare(password, userFound.password);
        if(!match)
            return next(new AppErr("Invalid Credentials", 400));
        res.status(201).json({
            id: userFound._id,
            fullname: userFound.fullname,
            email: userFound.email,
            status: "success",
            token: generateToken(userFound._id)
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

exports.userProfileCtrl = async (req, res, next) => {
    console.log(req.user);
    try {
        const user = await User.findById(req.user).populate({
            path: "accounts",
            populate: {
                path: "transactions",
                "model": "Transaction"
            }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

exports.userUpdateCtrl = async (req, res, next) => {
    try {
        // const existingUser = await User.findById(req.user);
        // if (!existingUser) {
        //     return next(new AppErr("User not found", 404));
        // }
        //check if the user is trying to update with the same details
        // let isSameFullname = true;
        // let isSameFullname = !fullname || existingUser.fullname === fullname;
        // const isSameEmail = !email || existingUser.email === email;
        // let isSamePassword = true;

        // if (password) {
        //     isSamePassword = await bcrypt.compare(password, existingUser.password);
        // }

        // if (isSameFullname && isSameEmail && isSamePassword) {
        //     return res.status(400).json({ message: "No changes to update" });
        // }

        //check if email exists
        if(req.body.email) {
            const userFound = await User.findOne({ email: req.body.email });
            if(userFound)
                return next(new AppErr("Email is already taken, Enter another Email", 400));
        }
        // Prepare the update data
        const updateData = req.body;

        //check if user is updating the password
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            //update the user
            updateData.password = hashPassword;
        }

        const user = await User.findByIdAndUpdate(req.user, updateData, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            user
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};

exports.userDeleteCtrl = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user);
        res.status(201).json({
            message: "user deleted successfully"
        });
    } catch (error) {
        console.error(error);
        next(new AppErr("Internal Server Error", 500));
    }
};
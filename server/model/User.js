const mongoose = require('mongoose');

//user Schema

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        hasCreatedAccount: {
            type: Boolean,
            default: false
        },
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Account"
            }
        ]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

//model
module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");


const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    creratedAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model("blacklistedToken", blacklistTokenSchema);   
const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema({
    key: String,
    used: {
        type: Boolean,
        default: false
    },
    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("vendorInvite", inviteSchema);
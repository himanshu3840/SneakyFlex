const mongoose = require("mongoose");
const vendorModel = require("../models/vendor-model");

mongoose.connect(process.env.MONGODB_URI);

async function createVendorKeys() {
    await vendorModel.create([
        { key: "VENDOR2026ABC" },
        { key: "VENDOR2026DEF" },
        { key: "VENDOR2026GHI" },
        { key: "VENDOR2026JKL" },
        { key: "VENDOR2026MNO" },
        { key: "VENDOR2026PQR" },
        { key: "VENDOR2026STU" },
        { key: "VENDOR2026VWX" },
        { key: "VENDOR2026YZA" },
        { key: "VENDOR2026BCD" }
    ]);

    console.log("10 vendor keys inserted");
    mongoose.connection.close();
}

createVendorKeys();
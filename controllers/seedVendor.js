require("dotenv").config();

const mongoose = require("mongoose");
const vendorModel = require("../models/vendor-model");

async function createVendorKeys() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await vendorModel.deleteMany({});

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
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

createVendorKeys();
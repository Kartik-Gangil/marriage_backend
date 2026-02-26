const mongoose = require("mongoose");

const carrer = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },

        village: {
            type: String,
            trim: true,
        },

        age: {
            type: Number,
            min: 0,
        },

        education: {
            type: String,
            trim: true,
        },

        workExperience: {
            type: String,
            trim: true,
        },

        mobile: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);



module.exports = mongoose.model("Carrer", carrer);
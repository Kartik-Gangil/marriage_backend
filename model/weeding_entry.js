const mongoose = require('mongoose');

const weedingEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    fatherName: {
        type: String,
        trim: true,
        required: true
    },

    caste: {
        type: String,
        trim: true,
        required: true
    },

    subCaste: {
        type: String,
        trim: true,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    education: {
        type: String,
        trim: true,
        required: true
    },

    maritalStatus: {
        type: String,
        enum: ["अविवाहित", "विवाहित", "Divorced", "Widowed"],
        default: "अविवाहित",
    },

    profession: {
        type: String,
        trim: true,
        required: true
    },

    color: {
        type: String,
        trim: true,
        required: true
    },

    weight: {
        type: String, // keep string because users may enter "70kg"
    },

    cityOrPlace: {
        type: String,
        trim: true,
        required: true
    },

    disabilities: {
        type: String,
        trim: true,
        required: true
    },

    expectedPartnerAge: {
        type: String,
        trim: true,
        required: true
    },

    maternalUncleProfession: {
        type: String,
        trim: true,
        required: true
    },

    mobileNo: {
        type: String,
        trim: true,
        required: true
    },

    land: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
},
    { timestamps: true });

const WeedingEntry = mongoose.model('WeedingEntry', weedingEntrySchema);

module.exports = WeedingEntry;
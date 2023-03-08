const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: Date,
    EndTime: Date,
    note: String,
    type: {
        type: Number,
        required: true,
    },
    complete: Boolean
})

const contactSchema = new mongoose.Schema([{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        length: 10,
    },
}],)


const plannerSchema = new mongoose.Schema({
    notes: {
        name: String,
        content: String,
    },

    contacts: contactSchema,

    holidays: [Date],

    events: eventSchema,
})

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    }, 
    password: {
        type: String,
        required: true,
    },

    planner: plannerSchema,
})

module.exports = mongoose.model("User", userSchema)
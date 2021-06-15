import mongoose from 'mongoose'

export const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    dep_name: {
        type: String,
        ref: 'Department',
        required: true,
        unique: true
    },
    dir_name: {
        type: String,
        ref: 'Direction',
        required: true,
        unique: true
    },
    div_name: {
        type: String,
        ref: 'Division',
        required: true,
        unique: true

    },
    director: {
        type: Boolean,
        default: false
    },



})

export default mongoose.model('Service', serviceSchema);
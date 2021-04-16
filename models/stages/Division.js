import mongoose from 'mongoose'

export const divisionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    dep_name: {
        type: String,
        ref: 'Department',
        required: true,
        unique: true,
    },

    dir_name: {
        type: String,
        ref: 'Direction',
        required: true,
        unique: true
    }



})

export default mongoose.model('Division', divisionSchema);
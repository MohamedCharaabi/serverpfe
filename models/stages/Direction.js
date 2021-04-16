import mongoose from 'mongoose'

export const directionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    dep_name: {
        type: String,
        // ref: 'Department',
        required: true,
        unique: true
    }



})

export default mongoose.model('Direction', directionSchema);
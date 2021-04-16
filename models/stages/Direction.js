import mongoose from 'mongoose'

export const directionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    dep: {

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        name: {
            type: String,
            ref: 'Department',
            required: true,
            unique: true
        },
    }





})

export default mongoose.model('Direction', directionSchema);
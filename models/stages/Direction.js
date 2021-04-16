import mongoose from 'mongoose'

export const directionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    dep_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        // required: true,
    },
    dep_name: {
        type: String,
        ref: 'Department',
        required: true,
        unique: true
    }



})

export default mongoose.model('Direction', directionSchema);
import mongoose from 'mongoose'

export const directionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    dep_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    }



})

export default mongoose.model('Direction', directionSchema);
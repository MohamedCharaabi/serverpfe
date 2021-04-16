import mongoose from 'mongoose'

export const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    dep_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    dir_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Direction',
        required: true,
    },
    div_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division',
        required: true,

    }



})

export default mongoose.model('Service', serviceSchema);
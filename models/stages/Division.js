import mongoose from 'mongoose'

export const divisionSchema = new mongoose.Schema({

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
        unique: true,
    },
    dir_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Direction',
        // required: true,
    },
    dir_name: {
        type: String,
        ref: 'Direction',
        required: true,
        unique: true
    }



})

export default mongoose.model('Division', divisionSchema);
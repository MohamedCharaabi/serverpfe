import mongoose from 'mongoose'

export const divisionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    dir_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Direction',
        required: true,

    }



})

export default mongoose.model('Division', divisionSchema);
import mongoose from 'mongoose'

export const depSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    director: {
        type: Boolean,
        default: false
    },


})

export default mongoose.model('Department', depSchema);
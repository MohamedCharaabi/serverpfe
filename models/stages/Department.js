import mongoose from 'mongoose'

export const depSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },


})

export default mongoose.model('Department', depSchema);
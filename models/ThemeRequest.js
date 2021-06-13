import mongoose from 'mongoose'

export const themeRequetsSchema = new mongoose.Schema({

    theme: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    why: {
        type: String,
        required: true,
    }


})

export default mongoose.model('Theme', themeRequetsSchema);
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
        // required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }


})

export default mongoose.model('ThemeRequest', themeRequetsSchema);
import mongoose from 'mongoose'

export const themeSchema = new mongoose.Schema({

    theme: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },


})

export default mongoose.model('Theme', themeSchema);
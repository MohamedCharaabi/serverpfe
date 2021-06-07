import mongoose from 'mongoose'

export const alertSchema = new mongoose.Schema({


    by: {
        type: String,
        required: true,

    },

    content: {
        type: String,
        required: true,
    },
    writedAt: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,
        default: false
    }



})

export default mongoose.model('Alert', alertSchema);
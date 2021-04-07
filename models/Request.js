import mongoose from 'mongoose'

export const requestSchema = new mongoose.Schema({

    nomDem: {
        type: String,
        required: true,
    },
    prenomDem: {
        type: String,
        required: true,
    },
    emailDem: {
        type: String,
        required: true,
    },
    themeDem: {
        type: String,
        required: true,
    },
    confDem: {
        type: String,
        required: true,
    },
    etatDem: {
        type: Number,
        required: true,
    },

    rmsqDem: {
        type: String,
        required: true,
    }, 
dateDem: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model('Request', requestSchema);
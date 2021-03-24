import mongoose from 'mongoose'

export const personSchema = new mongoose.Schema({

    nomPer: {
        type: String,
        required: true,
    },
    emailPer: {
        type: String,
        required: true,
    },
    passPer: {
        type: String,
        required: true,
    },
    rolePer: {
        type: String,
        required: true,
    },
    idDep: {
        type: Number,
        required: true,
    },
    idDir: {
        type: Number,
        required: true,
    },
    idDiv: {
        type: Number,
        required: true,
    },
    idSer: {
        type: Number,
        required: true,
    },


})

export default mongoose.model('Person', personSchema);
import mongoose from 'mongoose'

export const newSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        // required: true,
    },
    ability: [
        {
            action: {
                type: String,
                // required: true,
            },
            subject: {
                type: String,
                // required: true,
            }
        }
    ],
    extras: {
        eCommerceCartItemsCount: Number
    }


})

export default mongoose.model('NewUser', newSchema);
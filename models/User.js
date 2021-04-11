import mongoose from 'mongoose'
import { isEmail } from 'validator';

export const userSchema = new mongoose.Schema({

    nomPer: {
        type: String,
        required: true,
    },
    emailPer: {
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    passPer: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
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




// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.passPer = await bcrypt.hash(this.passPer, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ emailPer: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.passPer);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};



export default mongoose.model('Person', userSchema);
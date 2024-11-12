import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;
const { hash, compare } = bcrypt;
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        minLength: [6, 'Your password must be at least 6 characters in length']
    },
    notes: [{
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }]
}, {
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;
            return user;
        }
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        user.password = await hash(user.password, 10);
    }
    next();
});
userSchema.methods.validatePassword = async function (fromPassword) {
    return await compare(fromPassword, this.password);
};
const User = model('User', userSchema);
export default User;

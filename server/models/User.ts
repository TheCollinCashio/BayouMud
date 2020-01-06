import { Schema, Document, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import IUser from '../../interfaces/IUser';

interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string, callback: (err, isMatch: boolean) => void): void
}

let addressSchema = {
    country: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    latitude: String,
    longitude: String
};

let UserSchema = new Schema({
    username: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    password: String,
    address: addressSchema,
    image: String
}, { timestamps: true });

UserSchema.pre('save', function (next: any) {
    let user: any = this;
    if (!user.isModified('password')) { return next() };
    hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    //handle error
})

UserSchema.methods.comparePassword = function(candidatePassword, next) {
    compare(candidatePassword, this.password, function(err,isMatch) {
        if(err) {
            return next(err, null);
        }
        next(null, isMatch)
    })
}

export default model<IUserModel>('User', UserSchema);


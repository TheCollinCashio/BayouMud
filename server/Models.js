const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const bcrypt = require('bcryptjs');

let ObjectId = mongoose.Schema.Types.ObjectId;

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

let ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    leftInStock: Number,
    image: String,
    meta: {
        likes: Number,
        comments: Number
    }
});

let ProductOrderSchema = new mongoose.Schema({
    product: ObjectId,
    quantity: Number,
    user: ObjectId,
    shipTo: addressSchema,
    orderedOn: Date,
    isFilled: Boolean,
    shipBy: Date,
    arriveBy: Date
});

let CommentSchema = new mongoose.Schema({
    product: ObjectId,
    username: String,
    rating: Number,
    comment: String
});

let UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    password: String,
    address: addressSchema,
    image: String,
    hash: String,
    salt: String
}, { timeStamps: true });

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})

UserSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch) {
        if(err) {
            return next(err);
        }
        next(null,isMatch)
    })
}

exports.Product = mongoose.model('Product', ProductSchema);
exports.ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema)
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.User = mongoose.model('User', UserSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose')

// passport-local-mongoose by default add username, hash and salt field to store our username, 
// and the hashed password and the salt value
const userSchema = new Schema({
    email: {
        type: String, 
        required: true
    }
})

// Then we have to pass passport-local-mongoose as a plug-in to user
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);
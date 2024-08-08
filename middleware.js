const Listing = require('./models/listing');
const Review = require('./models/review.js')
const { reviewSchema, listingSchema } = require('./schema.js')
const ExpressError = require('./utils/ExpressError.js')

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        // redirectUrl Save
        req.session.redirectUrl = req.originalUrl; 
        /*
            We donot directly store redirectUrl in res.locals here bcz whenever a new req cycle start or when the server
            send the responce to the client, res.locals is cleared and thus is used to send data to the ejs templates
            mostly and also used with app.use() middlewares which are executed every time any req is made, for this 
            purpose we first store the redirectUrl in session and from session we store it in req.locals bcz when the
            passport.authenticate() middleware is executed, it clears the req.session object.
            Thus we dont do this:
                res.locals.redirectUrl = req.originalUrl;
        */
        // 
        req.flash('error', 'you must be logged in first!')
        return res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash('error', "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash('error', "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// Server-Side Validation Functions using Joi package 
module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }else{
        next();
    }
}
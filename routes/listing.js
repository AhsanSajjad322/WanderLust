const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js') 
const listingControlller = require('../controller/listings.js')
const multer = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage }) 


router.route('/')
    .get(wrapAsync(listingControlller.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingControlller.createListing)) 
    
// New Route
router.get("/new", isLoggedIn,listingControlller.renderNewForm )

router.route("/:id")
    .get(wrapAsync(listingControlller.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingControlller.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControlller.destroyListing))


// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingControlller.renderEditForm))

module.exports = router;
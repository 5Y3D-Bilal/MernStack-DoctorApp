// ^All Imports===================
import express from 'express'
import { createReview, getAllReviews } from "./../Controllers/reviewController.js"
import { authenticate, restrict } from "./../AUTH/getTokenFromHeaders.js"
// ^==========================


// ^Route=====================
const router = express.Router({ mergeParams: true })
router
    .route('/')
    .get(getAllReviews)
    // ^only patients can use this route mean a user with "patient" role
    .post(authenticate, restrict(['patient']), createReview)
// ^==========================


export default router
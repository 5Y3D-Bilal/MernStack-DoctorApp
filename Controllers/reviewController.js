// ^All Imports =====================
import Review from "../Models/ReviewSchema.js"
import Doctor from "../Models/DoctorSchema.js"
// ^=============================

// ^=============================
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})

        res.status(200).json({
            sucssess: true,
            message: 'Successful',
            data: reviews
        })
    } catch (error) {
        res.status(404).json({
            sucssess: false,
            message: 'Not Found',
        })
    }
}
export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId
    if (!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)

    try {
        const savedReview = await newReview.save()

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({
            sucssess: true,
            message: 'Review submited',
            data: savedReview
        })
    } catch (err) {
        res.status(500).json({
            sucssess: false,
            message: err.message
        })
    }
}
// ^=============================

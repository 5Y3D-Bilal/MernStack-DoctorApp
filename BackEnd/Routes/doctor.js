// ^ALL IMPORTS=========
import express from 'express'
import { deleteDoctor, getSingleDoctor, getAllDoctors, updateDoctor, getDoctorProfileData } from "../Controllers/doctorController.js"
import { authenticate, restrict } from '../AUTH/getTokenFromHeaders.js'
import reviewRouter from "./review.js"
// ^==================

// ^Route=====================
const router = express.Router()
//* Nested Route with doctor route
router.use("/:doctorId/reviews", reviewRouter)

router.get('/', getAllDoctors)
router.get('/:id', getSingleDoctor)
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor)
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor)


router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfileData)
// ^Route=====================

export default router


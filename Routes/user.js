// ^=========All Imports
import express from 'express'
import { updateUser, deleteUser, getSingleUser, getAllUser , getUserProfileData , getMyAppointments } from '../Controllers/userController.js'
import { authenticate, restrict } from '../AUTH/getTokenFromHeaders.js'
// ^================


// ^Route=====================
const router = express.Router()
// !Only admins with the role of "admin" can access this route
router.get('/', authenticate, restrict(["admin"]), getAllUser)
// *Only patient with the role of "patient" can access this route
router.get('/:id', authenticate, restrict(["patient"]), getSingleUser)
// &Only patient with the role of "patient" can access this route
router.put('/:id', authenticate, restrict(["patient"]), updateUser)
// *Only patient with the role of "patient" can access this route
router.delete('/:id', authenticate, restrict(["patient"]), deleteUser)
router.get('/profile/me', authenticate, restrict(["patient"]), getUserProfileData)
router.get('/appointments/my-appointments', authenticate, restrict(["patient"]), getMyAppointments)
// ^Route=====================



export default router

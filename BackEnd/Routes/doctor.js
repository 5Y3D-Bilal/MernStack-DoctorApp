// ^ALL IMPORTS=========
import express from 'express'
import { deleteDoctor, getSingleDoctor, getAllDoctors, updateDoctor } from "../Controllers/doctorController.js"
// ^==================

const router = express.Router()

router.get('/', getAllDoctors)
router.get('/:id', getSingleDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

export default router


// ^ ALL IMPORTS
import express from "express"
import { login, register } from "../Controllers/authController.js"
// ^ ======================

// ^Route=====================
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
// ^Route=====================


export default router
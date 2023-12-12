// ^ ALL IMPORTS
import express from "express"
import { login, register } from "../Controllers/authController.js"
// ^ ======================

// * ============All Auth Routes
const router = express.Router()
router.post('/register', register)
router.post('/login', login)
// * ======================

export default router
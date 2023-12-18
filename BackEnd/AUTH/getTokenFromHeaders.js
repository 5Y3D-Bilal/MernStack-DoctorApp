import jwt from 'jsonwebtoken'
import Doctor from '../Models/DoctorSchema.js'
import User from '../Models/UserSchema.js'

export const authenticate = async (req, res, next) => {
    // get token from headers
    const authToken = req.headers.authorization

    // chech token exists
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({
            status: false,
            message: "No token , authorization denied"
        })
    }

    try {
        const token = authToken.split(' ')[1]

        // Verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id
        req.role = decoded.role
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token is expired'
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId

    let user

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if (patient) {
        user = patient
    }
    if (doctor) {
        user = doctor
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({
            success: false,
            message: 'Your not authorized'
        })
    }

    next()
}
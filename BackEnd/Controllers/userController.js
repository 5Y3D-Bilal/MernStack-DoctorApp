// ^=========All Imports
import User from '../Models/UserSchema.js'
import Booking from "../Models/BookingSchema.js"
import Doctor from "../Models/DoctorSchema.js"
import bcrypt from "bcryptjs"
// ^====================


// ^=============================
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { password } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )

        const salt = await bcrypt.genSalt(10)
        const hassedpassword = await bcrypt.hash(password, salt)

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: updateUser,
            hassedpassword
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(
            id,
        )
        res.status(200)
            .json({
                success: true,
                message: 'Successfully Deleted',
            })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to Delete'
        })
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).select('-password')
        res.status(200).json({
            success: true,
            message: 'Got Single User with id',
            data: user
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to get user'
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.status(200).json({
            success: true,
            Results: users.length,
            message: 'Get All Users ',
            data: users
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to all users'
        })
    }
}

export const getUserProfileData = async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: 'No user found'
            })
        }



        const { password, ...reset } = user._doc

        res.status(200).json({
            succes: true,
            message: "Got user Profile",
            data: { ...reset }
        })
    } catch (err) {
        res.status(500).json({
            succes: false,
            message: "Something went Worng , cannot get Profile"
        })
    }
}

export const getMyAppointments = async (req, res) => {
    try {
        // 1) retrive Appointments from booking for spacific user
        const booking = await Booking.find({ user: req.userId })

        // 2) extracting doctor ids from appointments bookings
        const doctorids = booking.map(el => el.doctor.id)

        // 3) retrive doctors using doctors ids
        const doctors = await Doctor.find({ _id: { $in: doctorids } }).select('-password')

        res.status(200).json({
            succes: true,
            message: "Appointments are getting",
            data: doctors
        })
    } catch (err) {
        res.statsu(500).jsom({
            succes: false,
            message: "Something went Worng , cannot get Profile"
        })
    }
}
// ^=============================


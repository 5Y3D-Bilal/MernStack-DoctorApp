// ^=========All Imports
import Dcotor from '../Models/DoctorSchema.js'
import Booking from '../Models/BookingSchema.js'

// ^====================


// ^=============================

export const updateDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const updateDoctor = await Dcotor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: updateDoctor
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id
    try {
        await Dcotor.findByIdAndDelete(
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

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const doctor = await Dcotor.findById(id).populate("reviews").select('-password')
        res.status(200).json({
            success: true,
            message: 'Got Single Dcotor with id',
            data: doctor
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to get Dcotor'
        })
    }
}

export const getAllDoctors = async (req, res) => {
    try {
        const { query } = req.query
        let doctors

        if (query) {
            doctors = await Dcotor.find({
                isApproved: "approved",
                // !----------------------------Here I means case intencive searching means BIlaL = bilal
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select('-password')
        } else {
            doctors = await Dcotor.find({ isApproved: 'approved' }).select('-password')
        }
        res.status(200).json({
            success: true,
            Results: doctors.length,
            message: 'Get All Doctors ',
            data: doctors
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to all Doctors'
        })
    }
}

export const getDoctorProfileData = async (req, res) => {
    const doctorId = req.doctorId

    try {
        const doctor = await Dcotor.findById(doctorId)

        if (!doctor) {
            return res.status(404).json({
                succes: false,
                message: 'No user found'
            })
        }

        const { password, ...reset } = doctor._doc
        const appointments = await Booking.find({ doctor: doctorId })

        res.status(200).json({
            succes: true,
            message: "Got user Profile",
            data: { ...reset, appointments }
        })
    } catch (err) {
        res.statsu(500).jsom({
            succes: false,
            message: "Something went Worng , cannot get Profile"
        })
    }
}
// ^=============================


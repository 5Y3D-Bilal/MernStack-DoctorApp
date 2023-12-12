// ^=========All Imports
import Dcotor from '../Models/DoctorSchema.js'
// ^====================


// *====================
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
        const doctor = await Dcotor.findById(id).select('-password')
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
                isApproved: "Approved",
                // !----------------------------Here I means case intencive searching means BIlaL = bilal
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select('-password')
        } else {
            doctors = await Dcotor.find({ isApproved: 'approved' }).select('-password')
        }
        const doctor = await Dcotor.find({}).select('-password')
        res.status(200).json({
            success: true,
            Results: doctor.length,
            message: 'Get All Doctors ',
            data: doctor
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to all Doctors'
        })
    }
}
// *====================

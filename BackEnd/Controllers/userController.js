// ^=========All Imports
import User from '../Models/UserSchema.js'
// ^====================


// *====================
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: updateUser
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
// *====================

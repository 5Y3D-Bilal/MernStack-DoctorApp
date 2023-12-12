import User from '../Models/UserSchema.js'
import Doctor from '../Models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


// *Genrate Token Function
const genrateToken = (user) => {
    return jwt.sign(
        {
            id: user._id, role: user.role
        }
        , process.env.JWT_SECRET,
        {
            expiresIn: '15d',
        })
}
// *====================
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender, } = req.body
    try {
        let user = null

        if (role === 'patient') {
            user = await User.findOne({ email })
        }
        else if (role === 'doctor') {
            user = await Doctor.findOne({ email })
        }

        // ^Check if the user exists
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }

        // ^Converting the given password to a hash then storeing it in MONGODB
        const salt = await bcrypt.genSalt(10)
        const hassedpassword = await bcrypt.hash(password, salt)

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hassedpassword,
                photo,
                gender,
                salt
            })
        }

        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hassedpassword,
                photo,
                gender,
                salt
            })
        }

        await user.save()
        res.status(200).json({
            success: true,
            message: 'User successfly created'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internel server error, Try Again Later'
        })

    }
}
export const login = async (req, res) => {
    const { email } = req.body
    try {
        let user = null

        const patient = await User.findOne({ email })
        const doctor = await Doctor.findOne({ email })

        if (patient) {
            user = patient
        }

        if (doctor) {
            user = doctor
        }


        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        // ^Compareing Password
        const isPasswordIsMatching = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordIsMatching) {
            return res.status(400).json({ message: 'Invalid  Password' })
        }

        // ^If the password exist then create a token
        const token = genrateToken(user)

        const { password, role, appointments, ...rest } = user._doc

        res.status(200).json({
            status: true,
            message: 'Successfly login',
            token,
            data: { ...rest },
            role
        })


    } catch (error) {
        res.status(500).json({ staus: false, message: "Faild to login" })
    }
}
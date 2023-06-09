import React, { useState } from 'react'
import "./ChangePassword.scss"
import { changePassword } from '../../services/authService'
import { toast } from 'react-toastify'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'


const initialState = {
    oldPassword: "",
    password: "",
    password2: ""
}

const ChangePassword = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)
    const { oldPassword, password, password2 } = formData

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const ChangePass = async (e) => {
        e.preventDefault()

        if (password !== password2) {
            return toast.error("New Password doesn't match")
        }

        const formData = {
            oldPassword,
            password
        }

        const data = await changePassword(formData)
        toast.success(data);
        navigate("/profile")
    }

    return (
        <div className='changePassword'>
            <Card cardClass="password=card">
                <h3>Change Password</h3>
                <form onSubmit={ChangePass} className="--form-control">
                    <input type="password" placeholder='Old Password' required name='oldPassword' value={oldPassword} onChange={handleInputChange} />
                    <input type="password" placeholder='New Password' required name='password' value={password} onChange={handleInputChange} />
                    <input type="password" placeholder='Confirm New Password' required name='password2' value={password2} onChange={handleInputChange} />
                    <button type='submit' className="--btn --btn-primary">Change Password</button>
                </form>
            </Card>
        </div>
    )
}

export default ChangePassword

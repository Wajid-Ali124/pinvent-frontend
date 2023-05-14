import React, { useState } from 'react'
import Card from '../../components/card/Card'
import "./Contact.scss"
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../services/authService';

const Contact = () => {

    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const data = {
        subject,
        message
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/api/contact`, data)
            toast.success("Email Sent")
            setSubject("")
            setMessage("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='contact'>
            <h3 className="--mt">Contact US</h3>
            <div className="section">
                <form onSubmit={sendEmail}>
                    <Card cardClass="card">
                        <label>Subject:</label>
                        <input type="text" name='subject' required placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        <label>Message:</label>
                        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="10"></textarea>
                        <button className="--btn --btn-primary">Send Message</button>
                    </Card>
                </form>

                <div className="details">
                    <Card cardClass="card2">
                        <h3>Our Contact Information</h3>
                        <p>Fill the form or contact us via other channels listed below</p>

                        <div className="icons">
                            <span>
                                <FaPhoneAlt />
                                <p>+923022304253</p>
                            </span>
                            <span>
                                <FaEnvelope />
                                <p>pinvent@gmail.com</p>
                            </span>
                            <span>
                                <GoLocation />
                                <p>Karachi</p>
                            </span>
                            <span>
                                <FaTwitter />
                                <p>@wajidtrust</p>
                            </span>
                        </div>

                    </Card>
                </div>

            </div>
        </div>
    )
}

export default Contact

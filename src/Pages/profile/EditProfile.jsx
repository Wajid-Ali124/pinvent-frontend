import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import "./Profile.scss"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUser } from '../../services/authService'
import ChangePassword from '../changePassword/ChangePassword'

const EditProfile = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)
    const { email } = user

    useEffect(() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email, navigate])



    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
    }

    const [profile, setProfile] = useState(initialState)
    const [profileImage, setProfileImage] = useState("")

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }


    const saveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Handle Image Upload
            let imageURL;
            let publicId;
            if (
                profileImage &&
                (profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png")
            ) {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", "drvxekfod");
                image.append("upload_preset", "hpdbzlys");

                // First save image to Cloudinary
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/drvxekfod/image/upload",
                    { method: "post", body: image }
                );

                const imgData = await response.json();
                imageURL = imgData.url.toString();
                publicId = imgData.public_id.toString();
            }

            // Save Profile
            const formData = {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? { url: imageURL, publicId: publicId } : profile.photo,
            };

            const data = await updateUser(formData);
            console.log(data);
            toast.success("User Updated");
            navigate("/profile");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error.message);
        }
    };


    return (
        <div>
            {isLoading && <Loader />}
            <Card cardClass={"card --flex-dir-column"}>
                <span className="profile-photo">
                    <img src={user?.photo.url} style={{ width: '300px' }} alt="profilepic" />
                </span>
                <form className="--form-control --m" onSubmit={saveProfile}>
                    <span className="profile-data">
                        <p>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={profile?.name}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Email:</label>
                            <input type="text" name="email" value={profile?.email} disabled />
                            <br />
                            <code>Email cannot be changed.</code>
                        </p>
                        <p>
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile?.phone}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label>Bio:</label>
                            <textarea
                                name="bio"
                                value={profile?.bio}
                                onChange={handleInputChange}
                                cols="30"
                                rows="10"
                                style={{ display: 'block' }}
                            ></textarea>
                        </p>
                        <p>
                            <label>Photo:</label>
                            <input type="file" name="image" onChange={handleImageChange} />
                        </p>
                        <div>
                            <button className="--my2 --btn --btn-primary">Save Profile</button>
                        </div>
                    </span>
                </form>
            </Card>
            <ChangePassword />
        </div>
    )
}

export default EditProfile

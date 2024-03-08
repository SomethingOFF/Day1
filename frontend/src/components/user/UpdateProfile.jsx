import React, { useEffect, useState } from 'react'
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, user__myProfileAction, user__updateProfileAction } from '../../actions/userAction';
import Profile from "../../images/Profile.png"

import "./updateProfile.css"
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user__profile);
    const navigate = useNavigate()
    const { error, isUpdated, loading } = useSelector((state) => state.user___ChangeProfile);
    const [formdata, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar?.url,
    })
    const onChangeHandler = (e) => {
        const { name, value, files } = e.target
        if (name === "avatar") {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.readyState === 2) {
                    setFormData(prev => {
                        return {
                            ...prev,
                            avatar: reader.result
                        }
                    });
                }
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            });
        }
    }
    const onsubmitHandler = (e) => {
        e.preventDefault()
        dispatch(user__updateProfileAction(formdata))
    }
    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(user__myProfileAction());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={onsubmitHandler}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={formdata.name}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={formdata.email}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div id="updateProfileImage">
                                    <img src={formdata.avatar ? formdata.avatar : Profile} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProfile
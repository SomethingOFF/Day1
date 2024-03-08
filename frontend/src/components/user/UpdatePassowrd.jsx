import React, { useState } from 'react'
import "./UpdatePassowrd.css"
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { user__updateProfileAction } from '../../actions/userAction';
const UpdatePassowrd = () => {
    const dispatch = useDispatch();
    const {loading } = useSelector((state) => state.user__profile);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(user__updateProfileAction({ password: formData.newPassword }));
    }
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Profile</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={onSubmitHandler}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        placeholder="Old Password"
                                        required
                                        value={formData.oldPassword}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        name="newPassword"
                                        required
                                        value={formData.newPassword}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePassowrd
import React, { useEffect, useState } from 'react'
import "./style.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Profile from "../../images/Profile.png"
import { user__loginAction, user__registerAction } from '../../actions/userAction';
const LoginSignUp = () => {
    const [Tab, switchTab] = useState("login")
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: ""
    })
    const { loading, isAuthenticated } = useSelector((state) => state.user__profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        if (Tab === "login") {
            dispatch(user__loginAction(formData))
        } else {
            dispatch(user__registerAction(formData))
        }
    }
    useEffect(() => {
        setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            avatar: ""
        })
    }, [Tab])
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated,navigate])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div className='LoginSignUpBox-header position-relative'>
                                <div className="login_signUp_toggle">
                                    <p onClick={() => switchTab("login")}>LOGIN</p>
                                    <p onClick={() => switchTab("register")}>REGISTER</p>
                                </div>
                                <button className={`${Tab === "login" ? "leftbox" : "rightbox"}`}></button>
                            </div>
                            <form className="loginForm" onSubmit={onsubmitHandler}>
                                {Tab === "register" && <>
                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder="Name"

                                            name="name"
                                            value={formData.name}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="signUpName">
                                        <AccountCircleIcon />
                                        <input
                                            type="text"
                                            placeholder="username"

                                            name="username"
                                            value={formData.username}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </>}
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                {Tab === "register" && <div id="registerImage">
                                    <img src={formData.avatar ? formData.avatar : Profile} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={onChangeHandler}
                                    />
                                </div>}
                                {Tab === "login" && <Link to="/password/forgot">Forget Password ?</Link>}
                                <input type="submit" value={Tab === "login" ? "login" : "signup"} className="loginBtn" />
                            </form>

                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default LoginSignUp
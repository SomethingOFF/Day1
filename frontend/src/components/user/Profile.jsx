import React, { useEffect } from 'react'
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./profile.css"
const Profile = () => {
    const navigate = useNavigate()
    const { isAuthenticated, loading, user } = useSelector((state) => state.user__profile)
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate("/login");
        }
      }, [navigate, isAuthenticated]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>Hey! Buddy</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile
import React from 'react'
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
const About = () => {
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Hacker"
                        />
                        <Typography style={{color:"white"}}>somethingoff</Typography>
                        <Button onClick={()=>{}} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @somethingoff. Only with the
                            purpose to learning mern stack for my self
                        </span>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default About
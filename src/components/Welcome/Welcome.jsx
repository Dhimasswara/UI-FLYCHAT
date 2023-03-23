import React, { useState, useEffect } from "react";
import robot from '../../assets/logo/robot.gif'

const Welcome = () => {
  const [userName, setUserName] = useState("");
  
  const getDatas = async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }
  useEffect(() => {
    getDatas()
  }, []);

  return (
    <div className="text-light d-flex my-auto justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="row">
            <div className="col text-center">
                <img src={robot} alt="" />
                <h1 className="mt-0">Welcome, <span className="text-blue">{userName}</span></h1>
                <p className="mt-0">Tap your contact to start chat</p>
            </div>
        </div>
    </div>  
  )
}

export default Welcome
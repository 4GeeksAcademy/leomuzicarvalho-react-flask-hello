import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const [userToken, setUserToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        console.log(userToken);
        if(!userToken){
            navigate("/");
            return;
        } 
        setUserToken(userToken)
    })
    return (
        <>
        {userToken && <p>user loged in!</p>}
        </>
    )
};

export { UserInfo };
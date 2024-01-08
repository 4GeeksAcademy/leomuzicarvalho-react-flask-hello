import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword]= useState("");
	const [error, setError] = useState("");

	const login = async () => {
		const wasSuccessful = await actions.loginUser({
			email,
			password
		})

		if(wasSuccessful){
			navigate("/user-info");
			return;
		} 
		setEmail("")
		setPassword("")
		setError("User or password incorrect!");
	}

	return (
		<div className="text-center mt-5">
			<h1>login page</h1>
			<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<button onClick={login}>Login</button>
			{error && <p>{error}</p>}
		</div>
	);
};

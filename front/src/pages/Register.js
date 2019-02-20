import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			confirmation: "",
			status: "",
			jumpToProfile: false,
		};
	}

	postDataToDB() {
		const username = this.state.username;
		const password = this.state.password;
		const confirmation = this.state.confirmation;

		if (password === confirmation) {
			axios.post("/users/register", {
				data: {
					username: username,
					password: password,
				}
			}).then((response) => {
				console.log(response);
				this.setState({
					username: "",
					password: "",
					confirmation: "",
					status: "Register new user succeeded. ",
					jumpToProfile: true,
				});
			}).catch((error) => {
				this.setState({
					status: error.toString(),
				});
			});
		} else {
			this.setState({
				status: "Register new user failed since password and confirm password are not the same. ",
			});
		}
	}

	render() {
		if (this.state.jumpToProfile) {
			return (<Redirect to={"/user-profile"}/>);
		} else {
			return (
				<div className="Register">
					<h1>Register for a new user. </h1>
					<div>
						<label htmlFor="userName">User:</label>
						<input
							id="userName"
							type="text"
							placeholder="Username"
							onChange={(event) => {
								this.setState({
									username: event.target.value,
								});
							}}
						/>
						<label htmlFor="password">Password:</label>
						<input
							id="password"
							type="password"
							placeholder="password"
							onChange={(event) => {
								this.setState({
									password: event.target.value,
								});
							}}
						/>
						<label htmlFor="confirmation">Confirm password:</label>
						<input
							id="confirmation"
							type="password"
							placeholder="password"
							onChange={(event) => {
								this.setState({
									confirmation: event.target.value,
								});
							}}
						/>
					</div>
					<button
						onClick={() => {
							this.postDataToDB();
						}}>
						Submit
					</button>
					<span>{this.state.status}</span>
				</div>
			);
		}
	}
}

export default Register;
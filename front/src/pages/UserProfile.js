import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import "../css/user-profile.css";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			token: null,
			validUser: null,
			petInfoList: []
		};
	}

	componentDidMount() {
		// After user login, we will save his or her id, also called token, to cookies so that other pages could recognize user's identity.
		// Load user's token from cookies since we need to know who is visiting this website.
		// If we load user's token successfully, fetch user's profile from backend.
		// Otherwise, by setting validUser to false, we force user jump to login page.
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		if (token === undefined || token === null || token === "") {
			this.setState({
				validUser: false,
			});
		} else {
			axios.get("/users/fetchUser", {
				params: {
					token: token,
				}
			}).then((response) => {
				console.log(response);
				this.setState({
					email: response.data.email,
					username: response.data.username,
					validUser: true,
					petInfoList: response.data.petinfo
					//petName: response.data.petName,
					//petGender: response.data.petGender,
					//petSpecies: response.data.petSpecies,
					//petBreed: response.data.petBreed,
					//petAge: response.data.petAge,
					//petYears: response.data.petYears,
					//petIntroduction: response.data.petIntroduction,
				});
			});
		}
	}

	renderProfile() {
		let greetingsInfo = null;

		const pet_arr = this.state.petInfoList.map((value, index) => {
			return (
				<li key={index}>
					Name:{value.petName}
					gender:{value.petGender}
					species:{value.petSpecies}
					Breed:{value.petBreed}
					Age:{value.petAge}
					years:{value.petYears}
					Intro:{value.petIntroduction}
				</li>
			);
		});

		if (this.state.username !== undefined && this.state.username !== null && this.state.username !== "") {
			greetingsInfo = (<h1>{this.state.username} </h1>);
		}

		//
		return (
			<div>
				<NavigationBar />
				<Container>
					<Row>
						<Col lg={"3"}>
							<img className={"avatar"} src={"images/avatar.svg"} alt="" />
						</Col>
						<Col lg={"9"}>
							{greetingsInfo}
							<ul>
								{pet_arr}
							</ul>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

	render() {
		if (this.state.validUser === false) {
			return (<Redirect to={"/login"}/>);
		} else {
			return this.renderProfile();
		}
	}
}

export default UserProfile;

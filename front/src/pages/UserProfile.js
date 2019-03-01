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
					petName: response.data.petName,
					petGender: response.data.petGender,
					petSpecies: response.data.petSpecies,
					petBreed: response.data.petBreed,
					petAge: response.data.petAge,
					petYears: response.data.petYears,
					petIntroduction: response.data.petIntroduction,
				});
			});
		}
	}

	renderProfile() {
		let greetingsInfo = null;
		let info_name = null;
		let info_gender = null;
		let info_species = null;
		let info_Breed = null;
		let info_age = null;
		let info_years = null;
		let info_introduction = null;
		if (this.state.username !== undefined && this.state.username !== null && this.state.username !== "") {
			greetingsInfo = (<h1>{this.state.username} </h1>);
		}
		//add new function
		if (this.state.petName !== undefined && this.state.petName !== null && this.state.petName !== "") {
			info_name = (<h1>{this.state.petName} </h1>);
		}
		if (this.state.petGender !== undefined && this.state.petGender !== null && this.state.petGender !==""){
			info_gender = (<h1>{this.state.petGender} </h1>);
		}
		if (this.state.petSpecies !== undefined && this.state.petSpecies !== null && this.state.petSpecies !==""){
			info_species = (<h1>{this.state.petSpecies} </h1>);
		}
		if (this.state.petBreed !== undefined && this.state.petBreed !== null && this.state.petBreed !==""){
			info_Breed= (<h1>{this.state.petBreed} </h1>);
		}
		if (this.state.petAge !== undefined && this.state.petAge !== null && this.state.petAge !==""){
			info_age= (<h1>{this.state.petAge} </h1>);
		}
		if (this.state.petYears !== undefined && this.state.petYears !== null && this.state.petYears !==""){
			info_years= (<h1>{this.state.petYears} </h1>);
		}
		if (this.state.petIntroduction !== undefined && this.state.petIntroduction !== null && this.state.petIntroduction !==""){
			info_introduction= (<h1>{this.state.petIntroduction} </h1>);
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
							{info_name}
							{info_gender}
							{info_species}
							{info_Breed}
							{info_age}
							{info_years}
							{info_introduction}
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

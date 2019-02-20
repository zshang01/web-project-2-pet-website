import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import "../css/user-profile.css";
import { Container, Row, Col } from "react-bootstrap";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validUser: null
		};
	}

	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		if (token === undefined || token === null) {
			this.setState({
				validUser: false,
			});
		} else {
			// TODO: fetch user profile from database by token and add to this.state
		}
	}

	renderProfile() {
		return (
			<Container>
				<Row>
					<Col lg={"3"}>
						<img className={"avatar"} src={"images/avatar.svg"} alt="" />
					</Col>
					<Col lg={"9"}>
						<h1>Basic Information Here</h1>
					</Col>
				</Row>
			</Container>
		);
	}

	render() {
		if (this.state.validUser === false) {
			return this.renderProfile();
			// return (<Redirect to={"/register"}/>);
		} else {
			return this.renderProfile();
		}
	}
}

export default UserProfile;

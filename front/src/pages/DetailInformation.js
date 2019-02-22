import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PetForm from "./PetForm";

class DetailInformation extends React.Component {
	constructor(props) {
		super(props);
		console.log("constructor");
		let fromRegister = false;
		if (props.location.fromRegister) {
			fromRegister = true;
		}
		this.state = {
			accessible: fromRegister,
			jumpTo: "",
			token: "",
			firstName: "",
			lastName: "",
			gender: "",
			selfIntroduction: "",
			petCount: 0,
		};
	}

	handleOnChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	}

	componentDidMount() {
		console.log("componentDidMount");
		console.log("Check for accessibility for this page. ");
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		console.log("Login token: " + token);
		console.log("Accessibility: " + this.state.accessible);
		if (this.state.accessible) {
			this.setState({
				token: token,
			});
		} else {
			if (token === undefined || token === null || token === "") {
				this.setState({
					accessible: false,
					jumpTo: "/login",
				});
			} else {
				console.log("Jump to user-profile");
				this.setState({
					accessible: false,
					jumpTo: "/user-profile",
				});
			}
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const cookies = new Cookies();
		const email = cookies.get("pwLoggedIn");
		axios.post("/users/update-profile", {
			data: {
				email: email,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				gender: this.state.gender,
				selfIntroduction: this.state.selfIntroduction,
			}
		}).then(() => {
			this.setState({
				accessible: false,
				jumpTo: "/user-profile",
			});
		});
	}

	handleAddPet() {
		this.setState({
			petCount: this.state.petCount + 1,
		});
	}

	renderPetForm() {
		let docs = [];
		for (let i = 0; i < this.state.petCount; i++) {
			docs.push(<PetForm key={i}/>);
		}
		return docs;
	}

	render() {
		console.log("Render. ");
		if (this.state.accessible === false) {
			return (<Redirect to={this.state.jumpTo} />);
		} else {
			const petForm = this.renderPetForm();
			return (
				<Container>
					<Row>
						<Col className={"text-center my-4"} lg={"12"}>
							<h1>We would like to know more about you and your pets</h1>
						</Col>
					</Row>
					<Row>
						<Col className={"text-right my-2"} lg={"12"}><a href="/user-profile"><h4>Skip Now</h4></a></Col>
					</Row>
					<Form onSubmit={(e) => {this.handleSubmit(e);}}>
						<Form.Row>
							<Col lg={"4"}>
								<Form.Group controlId={"formFirstName"}>
									<Form.Label>First Name: </Form.Label>
									<Form.Control
										type={"input"}
										name={"firstName"}
										value={this.state.firstName}
										placeholder={"Your first name"}
										onChange={(e) => this.handleOnChange(e)}/>
								</Form.Group>
							</Col>
							<Col lg={"4"}>
								<Form.Group controlId={"formLastName"}>
									<Form.Label>Last Name: </Form.Label>
									<Form.Control
										type={"input"}
										name={"lastName"}
										value={this.state.lastName}
										placeholder={"Your last name"}
										onChange={(e) => this.handleOnChange(e)}/>
								</Form.Group>
							</Col>
							<Col lg={"4"}>
								<Form.Group controlId={"formGender"}>
									<Form.Label>Gender: </Form.Label>
									<Form.Control
										as={"select"}
										name={"gender"}
										value={this.state.gender}
										onChange={(e) => this.handleOnChange(e)}>
										<option></option>
										<option>Male</option>
										<option>Female</option>
										<option>Other</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={"12"}>
								<Form.Group controlId={"formSelfIntroduction"}>
									<Form.Label>Introduce yourself to others: </Form.Label>
									<Form.Control
										as={"textarea"}
										name={"selfIntroduction"}
										value={this.state.selfIntroduction}
										rows={"5"}
										onChange={(e) => this.handleOnChange(e)}
									/>
								</Form.Group>
							</Col>
						</Form.Row>
						<hr />
						{petForm}
						<Button variant="outline-primary" onClick={() => {this.handleAddPet();}}>Add a pet</Button>
						<Button variant={"primary"} type={"submit"}>Submit</Button>
					</Form>
				</Container>
			);
		}
	}
}

export default DetailInformation;
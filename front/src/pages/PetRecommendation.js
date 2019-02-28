import React from "react";
import axios from "axios";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class PetRecommendation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: false,
			name: "",
			age: 0,
			numberOfChildren: 0,
			havePet: "",
			result: null,
		};
	}

	handleOnChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post("/recommendation/form", {
			user: {
				name: this.state.name,
				age: this.state.age,
				childNumber: this.state.numberOfChildren,
				havePet: this.state.havePet,
			}
		}).then((response) => {
			this.setState({
				display: true,
				result: response.data,
			});
		});
	}

	render() {
		if (this.state.display) {

			return (
				<div>
					<NavigationBar />
					<Container>
						<Row>
							<Col>
								<p>id: {this.state.result._id}</p>
								<p>a: {this.state.result.a}</p>
							</Col>
						</Row>
					</Container>
				</div>
			);
		} else {
			return (
				<div>
					<NavigationBar />
					<Container>
						<Row>
							<Col className={"text-center my-4"} lg={"12"}>
								<h1>Pet Recommendation</h1>
							</Col>
						</Row>
						<Form onSubmit={(e) => {
							this.handleSubmit(e);
						}}>
							<Form.Row>
								<Col lg={"12"}>
									<Form.Group controlId={"formName"}>
										<Form.Label>Your name: </Form.Label>
										<Form.Control
											as={"input"}
											name={"name"}
											value={this.state.name}
											onChange={(e) => this.handleOnChange(e)}/>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={"12"}>
									<Form.Group controlId={"formAge"}>
										<Form.Label>Age: </Form.Label>
										<Form.Control
											as={"input"}
											type={"number"}
											name={"age"}
											value={this.state.age}
											onChange={(e) => this.handleOnChange(e)}/>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={"12"}>
									<Form.Group controlId={"formNumberOfChildren"}>
										<Form.Label>Number of Children: </Form.Label>
										<Form.Control
											as={"input"}
											type={"number"}
											name={"numberOfChildren"}
											value={this.state.numberOfChildren}
											onChange={(e) => this.handleOnChange(e)}/>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={"12"}>
									<Form.Group controlId={"formHavePet"}>
										<Form.Label>Do you have pet: </Form.Label>
										<Form.Control
											as={"select"}
											name={"havePet"}
											value={this.state.havePet}
											onChange={(e) => this.handleOnChange(e)}>
											<option></option>
											<option>Yes</option>
											<option>No</option>
										</Form.Control>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={"12"}>
									<Button variant={"primary"} type={"submit"}>Submit</Button>
								</Col>
							</Form.Row>
						</Form>
					</Container>
				</div>

			);
		}
	}
}

export default PetRecommendation;
import React from "react";
import { Form, Col, Button } from "react-bootstrap";

class PetForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			gender: "",
			onSumbit: props.onSubmit,
		};
	}

	handleOnChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log(name + ": " + value);

		this.setState({
			[name]: value,
		}, () => {
			console.log("State." + name + ": " + this.state[name]);
		});
	}

	render() {
		let person = "It";
		let persons = "Its";
		if (this.state.gender === "boy") {
			person = "He";
			persons = "His";
		} else if (this.state.gender === "girl") {
			person = "She";
			persons = "Her";
		}
		return (
			<div>
				<Form.Row>
					<Col lg={"8"}>
						<Form.Group controlId={"petName"}>
							<Form.Label>{persons} name: </Form.Label>
							<Form.Control
								as={"input"}
								name={"name"}
								value={this.state.name}
								placeholder={"Your pet name"}
								onChange={(e) => this.handleOnChange(e)} />
						</Form.Group>
					</Col>
					<Col lg={"4"}>
						<Form.Group controlId={"petGender"}>
							<Form.Label>{person} is a: </Form.Label>
							<Form.Control
								as={"select"}
								name={"gender"}
								value={this.state.gender}
								onChange={(e) => this.handleOnChange(e)}>
								<option></option>
								<option>boy</option>
								<option>girl</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col className={"text-right"} lg={"12"}>
						<Button variant="outline-danger">Remove this pet</Button>
					</Col>
				</Form.Row>
				<hr />
			</div>
		);
	}
}

export default PetForm;
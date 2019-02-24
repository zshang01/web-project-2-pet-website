import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

class PetForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: this.props.index,
		};
	}

	render() {
		return (
			<div>
				<Form.Row>
					<Col lg={"3"}>
						<Form.Group controlId={"petName"}>
							<Form.Label>Name: </Form.Label>
							<Form.Control
								as={"input"}
								name={"name"}
								value={this.props.petInfo.name}
								placeholder={"Your pet's name"}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
					<Col lg={"3"}>
						<Form.Group controlId={"petGender"}>
							<Form.Label>Gender: </Form.Label>
							<Form.Control
								as={"select"}
								name={"gender"}
								value={this.props.petInfo.gender}
								onChange={(e) => this.props.onChange(this.state.index, e)}>
								<option></option>
								<option>boy</option>
								<option>girl</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg={"3"}>
						<Form.Group controlId={"petAge"}>
							<Form.Label>Age: </Form.Label>
							<Form.Control
								as={"input"}
								type={"number"}
								name={"age"}
								value={this.props.petInfo.age}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
					<Col lg={"3"}>
						<Form.Group controlId={"petRaisedYears"}>
							<Form.Label>Raised years: </Form.Label>
							<Form.Control
								as={"input"}
								type={"number"}
								name={"raisedYears"}
								value={this.props.petInfo.raisedYears}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col lg={"4"}>
						<Form.Group controlId={"petSpecies"}>
							<Form.Label>Species: </Form.Label>
							<Form.Control
								as={"input"}
								name={"species"}
								value={this.props.petInfo.species}
								placeholder={"A cat, dog or other animal?"}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
					<Col lg={"4"}>
						<Form.Group controlId={"petBreed"}>
							<Form.Label>Breed: </Form.Label>
							<Form.Control
								as={"input"}
								name={"breed"}
								value={this.props.petInfo.breed}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col lg={"12"}>
						<Form.Group controlId={"petIntroduction"}>
							<Form.Label>Introduction: </Form.Label>
							<Form.Control
								as={"textarea"}
								name={"introduction"}
								value={this.props.petInfo.introduction}
								rows={"5"}
								placeholder={"Introduce your pet friend, like some fun facts..."}
								onChange={(e) => this.props.onChange(this.state.index, e)} />
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col className={"text-right"} lg={"12"}>
						<Button variant="outline-danger" onClick={() => this.props.onDelete(this.state.index)}>Remove this pet</Button>
					</Col>
				</Form.Row>
				<hr />
			</div>
		);
	}
}

PetForm.propTypes = {
	index: PropTypes.number.isRequired,
	petInfo: PropTypes.shape({
		name: PropTypes.string.isRequired,
		gender: PropTypes.string.isRequired,
		species: PropTypes.string.isRequired,
		breed: PropTypes.string.isRequired,
		age: PropTypes.number.isRequired,
		raisedYears: PropTypes.number.isRequired,
		introduction: PropTypes.string.isRequired,
	}).isRequired,
	onChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default PetForm;
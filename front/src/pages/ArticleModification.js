import React from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class ArticleModification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			title: "",
			content: "",
			jump: false,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (id !== "new") {
			axios.get("/articles/get-content", {
				params: {
					id: id,
				}
			}).then((response) => {
				const data = response.data;
				this.setState({
					id: id,
					title: data.name,
					content: data.content,
				});
			});
		}
	}

	handleOnSubmit(event) {
		event.preventDefault();
		axios.post("/articles/modify", {
			data: {
				id: this.state.id === "new" ? "" : this.state.id,
				title: this.state.title,
				content: this.state.content,
			}
		}).then(() => {
			this.setState({
				jump: true,
			});
		});
	}

	handleOnChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		let content = null;
		if (this.state.jump) {
			content = (<Redirect to={"/admin"} />);
		} else {
			const title = this.state.id === null ? (<h1>Adding New Article</h1>) : (<h1>Editing Article</h1>);
			content = (
				<Container>
					<Row className={"my-5"}>
						<Col className={"text-center"} lg={"12"}>
							{title}
						</Col>
					</Row>
					<Form onSubmit={(e) => this.handleOnSubmit(e)}>
						<Form.Row>
							<Col lg={"12"}>
								<Form.Group controlId={"formTitle"}>
									<Form.Label>Title: </Form.Label>
									<Form.Control
										as={"input"}
										type={"text"}
										name={"title"}
										value={this.state.title}
										onChange={(e) => this.handleOnChange(e)} />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={"12"}>
								<Form.Group controlId={"formContent"}>
									<Form.Label>Content: </Form.Label>
									<Form.Control
										as={"textarea"}
										name={"content"}
										value={this.state.content}
										rows={"20"}
										onChange={(e) => this.handleOnChange(e)} />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col className={"text-right"} lg={"12"}>
								<Button variant={"primary"} type={"submit"}>Submit</Button>
							</Col>
						</Form.Row>
					</Form>
				</Container>
			);
		}
		return (
			<div>
				{content}
			</div>
		);
	}
}

ArticleModification.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}),
};

export default ArticleModification;
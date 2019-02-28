import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Form, Col, Button, Row} from "react-bootstrap";

class CommentForm extends React.Component {

	handleOnSubmit(event) {
		event.preventDefault();
		axios.post("/articles/add-comment", {
			data: {
				articleId: this.props.articleId,
				userToken: this.props.userToken,
				comment: this.props.comment,
			}
		}).then((response) => {
			console.log(response.data);
			this.props.commentOnChange("");
		});
	}

	render() {
		if (this.props.enableComment) {
			return (
				<Form onSubmit={(e) => this.handleOnSubmit(e)}>
					<Form.Row>
						<Col lg={"12"}>
							<Form.Group controlId={"formComment"}>
								<Form.Label>Comments: </Form.Label>
								<Form.Control
									as={"textarea"}
									name={"comment"}
									value={this.props.comment}
									onChange={(e) => this.props.commentOnChange(e.target.value)}
									row={"5"}/>
							</Form.Group>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col className={"text-right"} lg={"12"}>
							<Button variant="primary" type={"submit"}>Submit</Button>
						</Col>
					</Form.Row>
				</Form>
			);
		} else {
			return (
				<Row>
					<Col className={"text-center"} lg={"12"}>
						<h3>If you want to leave and vote comments, please <a href="/login">login</a> first. </h3>
					</Col>
				</Row>
			);
		}
	}
}

CommentForm.propTypes = {
	articleId: PropTypes.string.isRequired,
	userToken: PropTypes.string.isRequired,
	enableComment: PropTypes.bool.isRequired,
	comment: PropTypes.string.isRequired,
	commentOnChange: PropTypes.func.isRequired,
};

export default CommentForm;
import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: false,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get("/articles/get-content", {
			params: {
				id: id,
			}
		}).then((response) => {
			const data = response.data;
			this.setState({
				id: data.id,
				name: data.name,
				content: data.content,
				display: true,
			});
		});
	}

	render() {
		let displayContent = null;
		if (this.state.display) {
			displayContent = (
				<div>
					<Row>
						<Col className={"text-center my-4"} lg={"12"}>
							<h1>{this.state.name}</h1>
						</Col>
					</Row>
					<Row>
						<Col lg={"12"}>
							{this.state.content}
						</Col>
					</Row>
				</div>
			);
		} else {
			displayContent = (
				<Row>
					<Col className={"text-center my-4"} lg={"12"}>
						<h1>Waiting...</h1>
					</Col>
				</Row>);
		}
		return (
			<Container>
				{displayContent}
			</Container>
		);
	}
}

export default Article;
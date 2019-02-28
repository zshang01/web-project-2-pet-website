import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

class Management extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			articleList: [],
		};
	}

	componentDidMount() {
		this.loadArticles();
	}

	loadArticles() {
		axios.get("/articles/list", {})
			.then((response) => {
				this.setState({
					loading: false,
					articleList: response.data,
				});
			});
	}

	handleDelete(event, index) {
		axios.delete("/articles/delete", {
			params: {
				id: this.state.articleList[index].id,
			}
		}).then(() => {
			this.loadArticles();
		});
	}

	renderContent() {
		const list = this.state.articleList.map((value, index) => {
			return (
				<Row className={"my-3"} key={index}>
					<Col lg={"9"}>
						<a href={"/admin/modify-article/" + value.id}>
							<h5>{value.name}</h5>
						</a>
					</Col>
					<Col className={"text-right"} lg={"3"}>
						<Button variant={"danger"} onClick={(e) => this.handleDelete(e, index)}>Delete</Button>
					</Col>
				</Row>
			);
		});
		return (
			<Container>
				<Row className={"my-5"}>
					<Col className={"text-center"} lg={"12"}>
						<h1>Manage Articles</h1>
					</Col>
				</Row>
				{list}
				<Row>
					<Col className={"text-right"} lg={"12"}>
						<Button variant={"primary"} href={"/admin/modify-article/new"}>+New Article</Button>
					</Col>
				</Row>
			</Container>
		);
	}


	render() {
		let content = null;
		if (this.state.loading) {
			content = (
				<Container>
					<Row>
						<Col className={"text-center"} lg={"12"}>
							<h1>Waiting...</h1>
						</Col>
					</Row>
				</Container>
			);
		} else {
			content = this.renderContent();
		}
		return (
			<div>
				{content}
			</div>
		);
	}
}

export default Management;
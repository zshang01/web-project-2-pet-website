import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articleList: [],
		};
	}

	componentDidMount() {
		axios.get("/articles/list", {})
			.then((response) => {
				this.setState({
					articleList: response.data, //后端叫resul t，前端叫response.data
				});
			});
	}

	render() {
		const links = this.state.articleList.map((value, index) => {
			return (
				<li key={index}>
					<a href={"/articles/" + value.id}>{value.name}</a>
				</li>
			);
		});
		return (
			<div>
				<NavigationBar />
				<Container>
					<Row>
						<Col className={"text-center my-4"} lg={"12"}>
							<h1>Homepage</h1>
						</Col>
					</Row>
					<Row>
						<ul>
							{links}
						</ul>
					</Row>
				</Container>
			</div>
		);

	}
}

export default App;

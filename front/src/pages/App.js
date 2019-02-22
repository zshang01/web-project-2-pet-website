import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

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
					articleList: response.data,
				});
			});
	}

	render() {
		const links = this.state.articleList.map((value) => {
			return (
				<li>
					<a href={"/articles/" + value.id}>{value.name}</a>
				</li>
			);
		});
		return (
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

		);

	}
}

export default App;

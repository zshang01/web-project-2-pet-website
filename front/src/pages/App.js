import React from "react";
// import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<Col className={"text-center my-4"} lg={"12"}>
						<h1>Homepage</h1>
					</Col>
				</Row>
			</Container>

		);
	}
}

export default App;

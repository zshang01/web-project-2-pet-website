import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavigationBar extends React.Component {
	render() {
		return (
			<Navbar	bg="light" expand="lg">
				<Navbar.Brand href="/">Pet Website</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Homepage</Nav.Link>
						<Nav.Link href="/recommendation">Recommendation</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
						<Nav.Link href="/user-profile">User</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavigationBar;
import React from "react";
import { Navbar, Nav, ButtonToolbar, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../css/navigation-bar.css";

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}

	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		if (token !== undefined && token !== null && token !== "") {
			this.setState({
				loggedIn: true,
			});
		} else {
			this.setState({
				loggedIn: false,
			});
		}
	}

	render() {
		let rightCornerContent = null;
		if (this.state.loggedIn) {
			rightCornerContent = (
				<a href="/user-profile"><img id={"rightCornerIcon"} src="images/avatar.svg" alt="" /></a>
			);
		} else {
			rightCornerContent = (
				<ButtonToolbar>
					<Button className={"mx-1"} variant={"primary"} href={"/register"}>Register</Button>
					<Button className={"mx-1"} variant={"success"} href={"/login"}>Sign in</Button>
				</ButtonToolbar>
			);
		}
		return (
			<Navbar	bg="light" expand="lg">
				<Navbar.Brand href="/">Pet Website</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Homepage</Nav.Link>
						<Nav.Link href="/recommendation">Recommendation</Nav.Link>
					</Nav>
					{rightCornerContent}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavigationBar;
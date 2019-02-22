import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App";
import UserProfile from "./pages/UserProfile";
import PetRecommendation from "./pages/PetRecommendation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavigationBar from "./pages/NavigationBar";
import DetailInformation from "./pages/DetailInformation";
import * as serviceWorker from "./serviceWorker";

const routing = (
	<div>
		<NavigationBar />
		<Router>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/user-profile" component={UserProfile} />
				<Route path="/contact" component={PetRecommendation} />
				<Route path="/detail" component={DetailInformation} />
				<Route path="/recommendation" component={PetRecommendation} />
			</div>
		</Router>
	</div>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

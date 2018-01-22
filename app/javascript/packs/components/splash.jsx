import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Splash extends React.Component {
	constructor(props) {
		super(props);
	}
		
  render() {
    return <div className="splash-component">
			<img className="imgresponsive-img" src={"assets/" + this.props.iconName} />
			<div className="content">
				<h1>Welcome to Vandebron</h1>
				<p>Get subscribed to change the way you consume energy!</p>
				<Link to="/subscribe" className="button white-bg vandebron-green">Subscribe</Link>
			</div>
		</div>;
  }
}
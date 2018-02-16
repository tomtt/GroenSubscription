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
    return <div className="row splash-component vandebron-gray-bg">
			<div className="col-md-2"></div>
			<div className="col-md-8">
				<img className="img-fluid" src={"assets/" + this.props.iconName} />
				<div className="content vandebron-green-bg">
					<h1>Welcome to Vandebron</h1>
					<p>Get subscribed to change the way you consume energy!</p>
					<div className="form-row row">
						<div className="col-md-2"></div>
						<div className="col-md-4 form-row">
							<Link to="/subscribe" className="Van-Button Van-Button--warning no-text-underlining white-text">Subscribe</Link>
						</div>
						<div className="col-md-4 form-row">
							<Link to="/subscriptions" className="mx-3 Van-Button Van-Button--success no-text-underlining white-text">List of subscriptions</Link>
						</div>
						<div className="col-md-2"></div>
					</div>
				</div>
			</div>
			<div className="col-md-2"></div>
		</div>;
  }
}
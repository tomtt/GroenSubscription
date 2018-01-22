import React from 'react'
import {
  Link
} from 'react-router-dom'

export default class Subscription extends React.Component {
	constructor(props) {
		super(props);
	}
		
  render() {
    return <div className="splash-component">
			<img className="imgresponsive-img" src={"assets/" + this.props.iconName} />
			<div className="row">
				<div className="col-md-12">
					<div className="content">
						<h1>Welcome to Vandebron</h1>
						<p>Get subscribed to change the way you consume energy!</p>
						<Link to="/subscribe" className="button white-colour">Subscribe</Link>
					</div>
				</div>
			</div>
		</div>;
  }
}
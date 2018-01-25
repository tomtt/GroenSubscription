import React from 'react'
import {
  Link
} from 'react-router-dom'
import fetch from 'isomorphic-fetch'

export default class SubscriptionsList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subscriptions: []
    };
	}
	
	componentDidMount() {
		this.fetchSubscriptions();
	}
	
	fetchSubscriptions() {
		var thisObject = this;
		fetch('/api/subscriptions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res, data) {
			return res.json();
    }).then(function(json) {
			thisObject.setState({ subscriptions: json });
  	}).catch(function(err) {
			thisObject.setState({ errorOnFetch: true });
		});
	}

  render() {
		
		const listOfSubscriptions = this.state.subscriptions.map((subscription) =>
			<li key={ subscription.id }>{subscription.name} | {subscription.email}</li>
		);
		
    return <div className="subscription-component">
			<div className="content">
				<h2>List of available subscriptions</h2>
				<ul>{listOfSubscriptions}</ul>
			</div>
		</div>;
  }
}
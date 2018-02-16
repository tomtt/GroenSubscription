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
	
	address_for(subscription) {
		let address = subscription.address[0];
		return address.street + " " + address.number + ", " + address.zipcode + " " + address.city;
	}
	
	gender_word_for(subscription) {
		let subscriptions = {male: 'Man', female: "Woman", other: "Other"};
		return subscriptions[subscription.gender];
	}
	
	renderList() {
		const listOfSubscriptions = this.state.subscriptions.map((subscription) =>
			<tr className="Van-Table-row" key={ subscription.id }>
				<td className="Van-Table-cell">{ subscription.id }</td>
				<td className="Van-Table-cell">{ subscription.name }</td>
				<td className="Van-Table-cell">{ this.gender_word_for(subscription) }</td>
				<td className="Van-Table-cell">{ subscription.email }</td>
				<td className="Van-Table-cell">{ subscription.phone }</td>
				<td className="Van-Table-cell">{ this.address_for(subscription) }</td>
			</tr>
		);
	
		return <div className="subscription-component">
			<div className="content vandebron-white-bg">		
				<p className="Van-u-text--h1">List of available subscriptions</p>
				<div className="row form-row">
					<table className="Van-Table Van-Table--full">
					  <thead className="Van-Table-head">
					    <tr>
					      <th className="Van-Table-headCell" scope="col">#</th>
					      <th className="Van-Table-headCell" scope="col">Name</th>
					      <th className="Van-Table-headCell" scope="col">Gender</th>
					      <th className="Van-Table-headCell" scope="col">Email</th>
					      <th className="Van-Table-headCell" scope="col">Phone</th>
								<th className="Van-Table-headCell" scope="col">Address</th>
					    </tr>
					  </thead>
					  <tbody className="Van-Table-body">
							{ listOfSubscriptions }
					  </tbody>
					</table>
				</div>
				<div className="row form-row">
					<Link to="/" className="Van-Button Van-Button--success no-text-underlining white-text">Return to Main page</Link>
				</div>
			</div>
		</div>;
	}

  render() {
		if(this.state.subscriptions.length > 0) {
			return this.renderList();
		} else {
			return <div className="subscription-component">
				<h2>List of available subscriptions</h2>
				<h3>Sorry, there are no members subscribed yet</h3>
				<div className="row form-row">
					<Link to="/" className="Van-Button Van-Button--success no-text-underlining white-text">Return to Main page</Link>
				</div>
			</div>
		}
		
  }
}
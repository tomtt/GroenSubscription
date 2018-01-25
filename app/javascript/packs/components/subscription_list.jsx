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
			<tr key={ subscription.id }>
				<td>{ subscription.id }</td>
				<td>{ subscription.name }</td>
				<td>{ this.gender_word_for(subscription) }</td>
				<td>{ subscription.email }</td>
				<td>{ subscription.phone }</td>
				<td>{ this.address_for(subscription) }</td>
			</tr>
		);
	
		return <div className="subscription-component">
			<h2>List of available subscriptions</h2>
			<div className="content">			
				<table className="table table-hover">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Name</th>
				      <th scope="col">Gender</th>
				      <th scope="col">Email</th>
				      <th scope="col">Phone</th>
							<th scope="col">Address</th>
				    </tr>
				  </thead>
				  <tbody>
						{ listOfSubscriptions }
				  </tbody>
				</table>
					
				<div className="my-7">
					<Link to="/" className="mx-3 Van-Button Van-Button--success no-text-underlining white-text">Return to Main page</Link>
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
				<div className="my-7">
					<Link to="/" className="mx-3 Van-Button Van-Button--success no-text-underlining white-text">Return to Main page</Link>
				</div>
			</div>
		}
		
  }
}
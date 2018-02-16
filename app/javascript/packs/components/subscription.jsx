import React from 'react'
import {
  Link
} from 'react-router-dom'
import fetch from 'isomorphic-fetch'

export default class Subscription extends React.Component {
	// Regexp used on this class
	emailRegexp : RegExp;
	phoneNumberRegexp: RegExp;
	zipcodeRegexp: RegExp;
	
	correctField : string; 
	errorField : string;
	
	constructor(props) {
		super(props);
		this.state = {
    	name: '',
			gender: '',
			email: '',
			phone: '',
			address_street: '',
			address_number: '', 
			address_city: '', 
			address_zipcode: ''
    };
		
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
		
		this.emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.phoneNumberRegexp = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
		this.zipcodeRegexp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
		
		this.correctField = "success";
		this.errorField = "warning";
	}
	
  onFieldChange(event) {
	  const name = event.target.name;
	  const value = event.target.value;
	  this.setState({[name]: value});
  }
	
	validateFieldFor(regexp, value) {
		var validField = regexp.test(value);
				
		if(value.length == 0) {
			return null;
		} else if(validField) {
			return this.correctField;
		}
		
		return this.errorField;
	}
	
	validateNonEmptyStatusOnFieldFor(fieldName) {
		return this.state[fieldName].length > 0 ? this.correctField : this.errorField;
	}
	
	emailValidationStatus() {
		return this.validateFieldFor(this.emailRegexp, this.state.email.toLowerCase());
	}
	
	phoneNumberValidationStatus() {
		return this.validateFieldFor(this.phoneNumberRegexp, this.state.phone);
	}
	
	zipcodeValidationStatus() {
		return this.validateFieldFor(this.zipcodeRegexp, (this.state.address_zipcode));
	}
	
	hasEmptyFields() {
		return this.validateNonEmptyStatusOnFieldFor('name') == "warning" || 
			this.validateNonEmptyStatusOnFieldFor('gender') == "warning" || 
			this.validateNonEmptyStatusOnFieldFor('address_street') == "warning" ||
			this.emailValidationStatus() == "warning" ||
			this.emailValidationStatus() == null ||
			this.phoneNumberValidationStatus() == "warning" ||
			this.phoneNumberValidationStatus() == null ||
			this.zipcodeValidationStatus() == "warning" ||
			this.zipcodeValidationStatus() == null
	}
	
	paramsForAPI() {
		return {
			name: this.state.name,
			gender: this.state.gender,
			email: this.state.email,
			phone: this.state.phone,
			address: [{
				street: this.state.address_street,
				city: this.state.address_city,
				zipcode: this.state.address_zipcode,
				number: this.state.address_number
			}]
		}
	}

  onSubmit(event) {
    event.preventDefault();
		
		function checkStatus(response) {
		  if (response.status >= 200 && response.status < 300) {
		    return response;
		  } else {
		    var error = new Error(response.statusText);
		    error.response = response;
		    throw error;
			}
		}

		if(this.hasEmptyFields()) {
			alert('Please make sure the name, gender and street address fields are not empty :)');
		} else {
			var parameters = this.paramsForAPI()
			return fetch('/api/subscriptions', {
	        method: 'POST',
	        body: JSON.stringify({subscription: parameters}),
	        headers: {
	            'Content-Type': 'application/json'
	        }
	    })
			.then(checkStatus)
			.then(function(res) {
				alert('You have been successfully subscribed');
				return res;
	    }).catch(function(err) {
				alert('We could not subscribe you. Please try again in another moment');
				return err 
			});
		}
  }
		
  render() {
    return <div className="subscription-component">
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					<p className="Van-u-text--h1">Thanks for your interest on Vandebron</p>
		
					<p className="Van-u-text-bold">Fill-in your details to be on the loop of the sustainable energy movement</p>
										
					<div className="content vandebron-white-bg">
						<form onSubmit={this.onSubmit}>
							<p className="Van-u-text--h2">Personal details</p>
						
							<div className="text-left">
								<div className="row form-row">
									<div className="col-md-8">
										<input className="txbox __m input-margin-bottom" name="name" type="text" placeholder="Name" value={this.state.name} onChange={ this.onFieldChange } /> 
									</div>
									<div className="col-md-4">
										<div className="select-wrapper">
											<select className="select" name="gender" value={this.state.gender} onChange={ this.onFieldChange }>
												<option value="">Select a gender</option>
								        <option value="male">Male</option>
								        <option value="female">Female</option>
								        <option value="other">Other</option>
								      </select>
										</div>
									</div>
								</div>
							</div>
		
							<div className="form-row row">
								<div className="col-md-6">
									<input name="email" className={ 'txbox __m input-margin-bottom ' + this.emailValidationStatus() } type="email" placeholder="E-mail" value={this.state.email} onChange={ this.onFieldChange } /> 
								</div>
								<div className="col-md-6">
									<input name="phone" className={ 'txbox __m input-margin-bottom ' + this.phoneNumberValidationStatus() } type="tel" placeholder="Dutch phone number" value={this.state.phone} onChange={ this.onFieldChange } /> 
								</div>
							</div>
		
							<hr/>
							
							<p className="Van-u-text--h2">Address info</p>
							<div className="form-row row">
								<div className="col-md-8">
									<input name="address_street" className="Van-TextInput-input" type="text" placeholder="Street" value={this.state.street} onChange={ this.onFieldChange } /> 
								</div>
								<div className="col-md-4">
									<input name="address_number" className="Van-TextInput-input" type="text" placeholder="House Number" value={this.state.number} onChange={ this.onFieldChange } /> 
								</div>
							</div>
							<div className="form-row row">
								<div className="col-md-4">
									<input name="address_zipcode" className={ 'Van-TextInput-input ' + this.zipcodeValidationStatus() } type="text" placeholder="Zipcode" value={this.state.zipcode} onChange={ this.onFieldChange } /> 
								</div>
								<div className="col-md-8">
									<input name="address_city" className="Van-TextInput-input" type="text" placeholder="City" value={this.state.city} onChange={ this.onFieldChange } /> 
								</div>
							</div>
							<div className="form-row row">
								<div className="col-md-4"></div>
								<div className="col-md-2 form-row">
									<input className="Van-Button Van-Button--warning white-text no-text-underlining" type="submit" value="Submit" />
								</div>
								<div className="col-md-2 form-row">
									<Link to="/" className="Van-Button Van-Button--success no-text-underlining white-text">Cancel</Link>
								</div>
								<div className="col-md-4"></div>
							</div>
						</form>
					</div>
				</div>
				<div className="col-md-2"></div>
			</div>
		</div>;
  }
}
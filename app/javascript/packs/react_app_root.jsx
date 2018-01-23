import React from 'react'
import ReactDOM from 'react-dom'
import Splash from './components/splash'
import Subscription from './components/subscription'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
		<Router>
			<div>			
				<Route exact path="/" render={() => <Splash iconName="windmill.png" /> }/>
				<Route exact path="/subscribe" render={() => <Subscription /> }/>
			</div>
		</Router>,
    document.getElementById("root"),
  )
})

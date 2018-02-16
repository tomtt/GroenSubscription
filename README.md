### README

This application allows a visitor to subscribe to a campaign by providing his information in a form. It is a transparent campaign because the visitor can also see who's already subscribed. 

For running it on your computer you just have to have installed `ruby` version 2.4. Once you have installed Ruby you have to do the following:

1. Clone this repository into your machine
2. Run `bundle install` when in the cloned directory. This commandwill make sure you have all the dependencies required for this app to run.
3. It is possible that you need to also run `yarn install` to update your Javascript dependencies.
4. Then, you have to prepare the database. In this particular case, we are using SQLite. For this reason you don't need to install a production ready DBMS such as MySQL or PostgreSQL. You only need to do `rake db:create && rake db:migrate` to create the development database and run the DB migrations required by the application. 
5. Finally, you have to run the `rails s` command to launch the local application server. 
6. Now go to your browser to localhost:3001 and *subscribe*!

#### Rspec

For executing the specs contained in this application you have to follow the next steps:

1. Execute `rake db:create RAILS_ENV=test && rake db:migrate RAILS_ENV=test`
2. Run the following command: `rspec spec/`
3. All the test suite should pass and show a green cascade of lines

#### Explanation

I decided to use this set of technology tools because it's the one I have more experience with and allows to build simple web applications with. In the case of Ruby on Rails 5.1 for example, it has improved to integrate almost seamlesly with webpack to support the new JS frameworks out there. In the case of `ReactJS` it has been much more easier to integrate with it and to manage the JS libraries that what it was available just one or two years ago: *react-rails*.

On the implementation, I went for the simplest solutions as for example, for handling the data storage I just used the out of the box provided database which can be used only in development environment. In the case of the API endpoints; the `subscription` fields and the fields for the `address` are structured according to the specification, however, in the internals of the API, they don't have a model/table for each one, therefore some field massaging is done on the backend to adjust the structure to be stored on a single table: subscriptions. In this case, the current solution would only support an address per subscription, as requested on the challenge description, even though the structuring of the fields on the subscription-address could imply a possibility of supporting multiple addresses on the subscription. 

The validation of data is covered at the three important levels: client side (JS), backend API(ORM layer) and database layer, for the fields that require it. 

The website is responsive using Twitter bootstrap directly and the styles defined on [this](https://vandebron.github.io/styleguide) Vandebron style guide. 

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

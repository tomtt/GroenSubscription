require 'rails_helper'

RSpec.describe "routes for Subscriptions", :type => :routing do
  
  describe 'API Section' do

    describe 'Subscriptions Controller' do
      it 'should have a route for subscription creation' do
        expect(post: '/api/subscriptions/').to route_to('api/subscriptions#create')
      end
    end
    
  end
end
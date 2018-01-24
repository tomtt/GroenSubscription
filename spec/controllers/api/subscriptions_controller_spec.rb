require 'rails_helper'
  
RSpec.describe Api::SubscriptionsController, type: :controller do
  
  describe "POST" do
    
    context "with valid attributes" do 
      
      before(:each) do
        @params = FactoryBot.subscription_with_address
      end
      
      it "creates a new subscription" do 
        expect{ 
          post :create, params: { subscription: @params }
        }.to change(Subscription, :count).by(1) 
      end 
      
      it "replies with a successful response" do
        post :create, params: { subscription: @params }
        expect(response).to be_successful
      end 
    end
    
    context "with invalid attributes" do
      
      before(:each) do
        @params = FactoryBot.subscription_with_address
        @params[:email] = "incorrect@mail"
      end
      
      it "doesn't create a new subscription" do 
        expect{ 
          post :create, params: { subscription: @params }
        }.to change(Subscription, :count).by(0) 
      end
      
      it "replies with an unsuccessful response" do
        post :create, params: { subscription: @params }
        expect(response).to_not be_successful
      end
      
    end
    
  end
end
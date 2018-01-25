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
  
  describe "GET" do
    
    context "with existing subscriptions" do 
      
      before(:each) do
        @params = Subscription.create(FactoryBot.subscription_with_address)
      end
      
      it "fetches a JSON response containing the list of available subscriptions" do 
        get :index
        expect(response.body).to eq([FactoryBot.subscription_with_address_as_if_persisted].to_json)
      end 
      
      it "replies with a successful response" do
        get :index
        expect(response).to be_successful
      end 
    end
    
    context "with no subscriptions" do
      
      it "fetches a JSON response containing an empty subscriptions collection" do 
        get :index
        expect(response.body).to eq([].to_json)
      end
      
      it "replies with a successful response" do
        get :index
        expect(response).to be_successful
      end
      
    end
    
  end
end
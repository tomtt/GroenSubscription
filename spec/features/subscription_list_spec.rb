require 'rails_helper'

RSpec.feature "User sees the list of subscribed members", type: :feature, js: true do
  
  context "Given that there is a member subscribed" do
    
    before(:each) do
      Subscription.create(FactoryBot.subscription_with_address)
    end
    
    describe "and the user is on the list of subscribed members" do
    
      background do
        visit('/subscriptions')
      end
    
      context "he should see the information of the member" do
    
        it "he should see the member information" do
          expect(page).to have_content('Name')
          expect(page).to have_content('Gender')
          expect(page).to have_content('Email')
          expect(page).to have_content('Phone')
          expect(page).to have_content('Address')
          
          expect(page).to have_content('John')
          expect(page).to have_content('john@example.com')
          expect(page).to have_content('Man')
          expect(page).to have_content('+31657756849')
          expect(page).to have_content('Vijzelstraat 39G, 3429TR Amsterdam')
        end
      
      end
      
    end
  end
  
  context "Given that there are no members subscribed" do
    
    describe "and the user is on the list of subscribed members" do
    
      background do
        visit('/subscriptions')
      end
    
      context "he should see the information of the member" do
    
        it "he should see an empty message saying no members have subscribed yet" do
          expect(page).to have_content('Sorry, there are no members subscribed yet')
        end
      
      end
      
    end
  end
end
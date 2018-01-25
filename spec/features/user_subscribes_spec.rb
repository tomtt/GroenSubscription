require 'rails_helper'

RSpec.feature "User subscribes", type: :feature, js: true do
  
  describe "When the user is on the subscribe page" do
    
    background do
      visit('/subscribe')
    end
    
    context "and he fills-in the form fields" do
    
      it "he should see a success message upon submitting the form when all the fields are filled up correctly" do
        fill_in('Name', with: 'John')
        select('Male', from: 'gender')
        fill_in('E-mail', with: 'john@example.com')
        fill_in('Dutch phone number', with: '+31657724845')
        fill_in('Street', with: 'Marnixstraat')
        fill_in('House Number', with: '45')
        fill_in('City', with: 'Amsterdam')
        
        fill_in('Zipcode', with: '1018TK')
        
        click_on('Submit')
        
        sleep 2
        expect(page.driver.browser.switch_to.alert.text).to eq('You have been successfully subscribed')
      end
      
    end
    
    context "and he forgets to fill-in fields like" do
      
      it "'Name', then he should see an alert" do
        fill_in('Street', with: 'Marnixstraat')
        select('Male', from: 'gender')
        
        click_on('Submit')
        
        expect(page.driver.browser.switch_to.alert.text).to eq('Please make sure the name, gender and street address fields are not empty :)')
      end
      
      it "'Male', then he should see an alert" do
        fill_in('Name', with: 'John')
        fill_in('Street', with: 'Marnixstraat')
        
        click_on('Submit')
        
        expect(page.driver.browser.switch_to.alert.text).to eq('Please make sure the name, gender and street address fields are not empty :)')
      end
      
      it "'Street', then he should see an alert" do
        fill_in('Name', with: 'John')
        select('Male', from: 'gender')
        
        click_on('Submit')
        
        expect(page.driver.browser.switch_to.alert.text).to eq('Please make sure the name, gender and street address fields are not empty :)')
      end
      
    end 
  end
  
end
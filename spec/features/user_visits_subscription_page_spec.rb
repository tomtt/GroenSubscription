require 'rails_helper'

RSpec.feature "User visits the subscription page", type: :feature, js: true do
  
  describe "When the user visits the splash page" do
    
    background do
      visit('/')
    end
      
    it "he can see an invitation to subscribe" do
      expect(page).to have_content 'Welcome to Vandebron'
      expect(page).to have_content 'Get subscribed to change the way you consume energy!'
      expect(page).to have_content 'Subscribe'
    end
    
    it "he can be guided to the subscribe form after clicking on the subscribe button" do
      click_link('Subscribe')
      
      expect(page).to have_current_path('/subscribe')
      
      expect(page).to have_content 'Thanks for your interest on Vandebron'
      expect(find_field('Name').value).to be_empty
      expect(find_field('E-mail').value).to be_empty
      expect(find_field('Dutch phone number').value).to be_empty
      expect(find_field('Street').value).to be_empty
      expect(find_field('House Number').value).to be_empty
      expect(find_field('City').value).to be_empty
      expect(find_field('Zipcode').value).to be_empty
    end
    
    it "he can return from the subscribe form to the splash screen" do
      click_link('Subscribe')
      expect(page).to have_current_path('/subscribe')
      
      click_link('Return')
      expect(page).to have_current_path('/')
    end
    
  end
  
  describe "When the user is on the subscribe page" do
    
    background do
      visit('/subscribe')
    end
    
    context "and he fills-in the form fields" do
      it "he should see a message error on the e-mail field as long as the provided email is in a wrong format" do
        expect(find_field('E-mail')[:class]).to be_empty
        fill_in('E-mail', with: 'john')
        expect(find_field('E-mail')[:class]).to eq("warning")
        fill_in('E-mail', with: 'john@')
        expect(find_field('E-mail')[:class]).to eq("warning")
        fill_in('E-mail', with: 'john@example')
        expect(find_field('E-mail')[:class]).to eq("warning")
        fill_in('E-mail', with: 'john@example.com')
        expect(find_field('E-mail')[:class]).to eq("success")
      end
    
      it "he should see a message error on the phone number field as long as the provided phone number is in a wrong format" do
        expect(find_field('Dutch phone number')[:class]).to be_empty
        fill_in('Dutch phone number', with: '+3')
        expect(find_field('Dutch phone number')[:class]).to eq("warning")
        fill_in('Dutch phone number', with: '+31768')
        expect(find_field('Dutch phone number')[:class]).to eq("warning")
        fill_in('Dutch phone number', with: '+31ai324')
        expect(find_field('Dutch phone number')[:class]).to eq("warning")
        fill_in('Dutch phone number', with: '+31657724845')
        expect(find_field('Dutch phone number')[:class]).to eq("success")
        fill_in('Dutch phone number', with: '00657724845')
        expect(find_field('Dutch phone number')[:class]).to eq("success")
      end
    
      it "he should see a message error on the zipcode field as long as the provided zipcode is in a wrong format" do
        expect(find_field('Zipcode')[:class]).to be_empty
        fill_in('Zipcode', with: '+43AM')
        expect(find_field('Zipcode')[:class]).to eq("warning")
        fill_in('Zipcode', with: '1017TROEP')
        expect(find_field('Zipcode')[:class]).to eq("warning")
        fill_in('Zipcode', with: '04830')
        expect(find_field('Zipcode')[:class]).to eq("warning")
        fill_in('Zipcode', with: '99501')
        expect(find_field('Zipcode')[:class]).to eq("warning")
        fill_in('Zipcode', with: '1017TR')
        expect(find_field('Zipcode')[:class]).to eq("success")
      end

    end
    
  end
  
end

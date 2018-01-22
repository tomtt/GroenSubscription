require 'rails_helper'

RSpec.feature "User subscribes", type: :feature, js: true do
  
  describe "User visits the splash view" do
    
    background do
      visit('/')
    end
      
    it "sees an invitation to subscribe" do
      expect(page).to have_content 'Welcome to Vandebron'
      expect(page).to have_content 'Get subscribed to change the way you consume energy!'
      expect(page).to have_content 'Subscribe'
    end
    
  end
  
end

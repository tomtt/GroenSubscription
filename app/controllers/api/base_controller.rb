class Api::BaseController < ApplicationController
  # Disabling authenticity token provided out of the box by RoR. 
  # Room for enhancement: include our own API token management system
  protect_from_forgery with: :null_session  
end
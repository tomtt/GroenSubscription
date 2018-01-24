Rails.application.routes.draw do
  root to: 'welcome#index'
  get '/subscribe', to: 'welcome#index'
  
  namespace :api do
    post 'subscriptions', to: 'subscriptions#create'
  end
end

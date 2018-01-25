Rails.application.routes.draw do
  root to: 'welcome#index'
  get '/subscribe', to: 'welcome#index'
  get '/subscriptions', to: 'welcome#index'
  
  namespace :api do
    post 'subscriptions', to: 'subscriptions#create'
    get 'subscriptions', to: 'subscriptions#index'
  end
end

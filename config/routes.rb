Rails.application.routes.draw do
  root to: 'welcome#index'
  get '/subscribe', to: 'welcome#index'
end

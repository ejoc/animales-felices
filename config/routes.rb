Rails.application.routes.draw do
  namespace :admin do
    resources :clients
    resources :doctors
    resources :suppliers
    resources :companies
    resources :products
    resources :services
    resources :users
    # resources :appointments
    # resources :people
    # resources :invoices
    # resources :invoice_details
    # resources :items

    root to: "clients#index"
  end

  get 'agenda', to: 'agenda#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
end

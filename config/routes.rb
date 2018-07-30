Rails.application.routes.draw do
  namespace :admin do
    resources :clients
    resources :specialists
    resources :suppliers
    resources :companies
    resources :products
    resources :services
    resources :specialist_services
    # resources :users

    # resources :appointments
    # resources :people
    # resources :invoices
    # resources :invoice_details
    # resources :items

    root to: "clients#index"
  end

  resources :specialists, only: [:index]
  resources :clients, only: [:index]
  resources :services, only: [:index]

  # get 'agenda', to: 'agenda#index'
  # post 'booking_appoiment', to: 'agenda#appointment'

  resources :appointments, except: [:new, :edit, :destroy] do
    collection do
      get 'specialists_by_service'
    end
    member do
      delete 'cancel'
    end
  end
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "appointments#index"
end

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

  resources :specialists, only: [:index] do
    resources :appointments, except: [:new, :edit, :destroy] do
      collection do
        get 'specialists_by_service'
      end
      member do
        delete 'cancel'
      end
    end
  end
  resources :clients, only: [:index]
  resources :services, only: [:index]
  resources :appointments

  get 'appointments/:day/:month/:year', to: 'appointments#index'

  get 'agenda', to: "pages#agenda"
  get 'facturacion', to: "pages#facturacion"

  # get 'agenda', to: 'agenda#index'
  # post 'booking_appoiment', to: 'agenda#appointment'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#agenda"
end

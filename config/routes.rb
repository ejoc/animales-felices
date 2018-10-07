Rails.application.routes.draw do
  namespace :admin do
    resources :clients
    resources :specialists
    resources :suppliers
    resources :companies
    resources :products
    resources :services
    resources :specialist_services
    resources :unit_types
    resources :product_categories
    # resources :users

    # resources :appointments
    # resources :people
    # resources :invoices
    # resources :invoice_details
    # resources :items

    root to: "clients#index"
  end

  # ruta para bussy_slots
  resources :specialists, only: [:index] do
    resources :appointments, except: [:new, :edit, :destroy] do
      collection do
        get 'specialists_by_service'
      end
      member do
        delete 'cancel'
      end
    end

    member do
      get 'bussy_slots'
    end
  end

  # redundat podria cambiar
  resources :appointments, except: [:new, :edit, :destroy] do
    collection do
      get 'specialists_by_service'
    end
    member do
      delete 'cancel'
    end
  end

  resources :suppliers, only: [:index, :show]
  resources :clients, only: [:index, :show]
  resources :services, only: [:index]

  get 'appointments/:day/:month/:year', to: 'appointments#index'

  resources :invoices, only: [:index, :create] do
    member { delete 'cancel' }
  end

  resources :income_products, only: [:index, :create]

  resources :stock_products, only: :index
  resources :products, only: :index

  get 'agenda', to: "pages#agenda"
  get 'facturacion', to: "pages#invoice"
  get 'ingreso-productos', to: "pages#purchase_invoice"

  # get 'agenda', to: 'agenda#index'
  # post 'booking_appoiment', to: 'agenda#appointment'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#agenda"
end

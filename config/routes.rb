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
      get 'reports'
      get 'other_report'
    end
    member do
      delete 'cancel'
    end
  end

  resources :suppliers, only: [:index, :show]
  resources :clients, only: [:index, :show, :create]
  resources :services, only: [:index]

  get 'appointments/:day/:month/:year', to: 'appointments#index'

  resources :invoices, only: [:index, :show, :create] do
    member { delete 'cancel' }
  end

  resources :income_products, only: [:index, :create]

  resources :stock_products, only: :index
  resources :products, only: :index

  # account
  resource :account, only: [:edit] do
    collection do
      patch 'update_password'
    end
    collection do
      patch 'update_email'
    end
  end

  # pages
  get 'agenda', to: "pages#agenda"
  get 'facturacion', to: "pages#invoice"
  get 'ingreso-productos/new', to: "pages#purchase_invoice"
  get 'ingreso-productos', to: "income_products#index"
  get 'reportes-estadisticos', to: "pages#statistical_reports"
  get 'reportes-ventas', to: "pages#sales_reports"
  get 'cuenta', to: "pages#account"

  # get 'agenda', to: 'agenda#index'
  # post 'booking_appoiment', to: 'agenda#appointment'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: "pages#agenda"

  devise_scope :user do
    authenticated :user do
      root 'pages#agenda', as: :authenticated_root
    end
  
    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
  
end

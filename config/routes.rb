Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root "tags#index"
  resources :tags, :only => [:create, :destroy]
  resources :games, :only => [:index, :create, :update]

end

Rails.application.routes.draw do
  post '/searcharea/:start/:limit', to: "geo#searcharea"
  get '/getlocation', to: "geo#getLocation"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :users, only: [:create]
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
  post "/aois/:userid", to: "geo#storeAois"
  get "/aois/:userid", to: "geo#getAois"
  get '/layers', to:'layer#index'
  post "/user_attributes/", to: "users#write_attributes"
  get '/user_attributes', to: "users#attributes"
end

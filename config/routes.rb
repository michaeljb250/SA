Rails.application.routes.draw do
  root to: "pages#home"
  get 'tunes/:filename', to: 'tunes#audio'
    resources :users
      resources :volumes
       resources :vols
        resources :autowahs
        resources :bpms
         resources :synths
          resources :reverbs
           resources :panners
            resources :delays
             resources :tremelos
              resources :eqs
               resources :compressors
                resources :jcverbs
                 resources :adsrs
                  resources :limiters
                   resources :phasers
                    resources :passs
                     resources :homes
                      resources :vibratos
                       resources :chorus
                        resources :pings
                         resources :multibands
                          resources :freeverbs
                           resources :passers
                            resources :jazzs
                             resources :rocks
                              resources :pops
    end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

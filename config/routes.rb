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
                               resources :drumlabs
                                resources :spatialaudios
                                resources :hip_hops
                                 resources :jazzdrums
                                  resources :synthlabs
                                   resources :livemixs
                                    resources :rockdrums
                                     resources :popdrums
                                      resources :hiphopdrums
                                       resources :indiepops
                                        resources :eightiespops
                                         resources :livepops
                                          resources :livejazzs
                                           resources :liverocks
                                            resources :livehiphops
                                             resources :theories
                                              resources :majorscales
                                               resources :minorscales
                                                resources :majorpentatonics
                                                 resources :minorpentatonics
                                                  resources :bluescales
                                                   resources :scales
                                                   resources :majortriads
                                                    resources :minortriads
                                                    resources :diminishedtriads
                                                     resources :augmentedtriads
                                                      resources :majorpentatonics
                                                       resources :minorpentatonics
                                                        resources :tempos
                                                         resources :majorscalegames
                                                          resources :minorscalegames
                                                           resources :minorsteps
                                                            resources :majorsteps
                                                             resources :bluescales
                                                              resources :minorblues
                                                               resources :abouts



    end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

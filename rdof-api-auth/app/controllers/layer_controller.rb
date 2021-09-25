class LayerController < ApplicationController
    def index() 
        layers = Layer.order(base_layer: :desc)
        render json: layers
    end
end

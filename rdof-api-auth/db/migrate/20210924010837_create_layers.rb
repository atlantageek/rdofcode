class CreateLayers < ActiveRecord::Migration[6.0]
  def change
    create_table :layers do |t|
      t.string :layer_type
      t.string :layer_url
      t.string :layer_name
      t.boolean :base_layer
      t.timestamps
    end
  end
end

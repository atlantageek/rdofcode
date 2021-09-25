class CreateAois < ActiveRecord::Migration[6.0]
  def change
    create_table :aois do |t|
      t.integer :user_id
      t.string :census_id
      t.geometry :geom

      t.timestamps
    end
  end
end

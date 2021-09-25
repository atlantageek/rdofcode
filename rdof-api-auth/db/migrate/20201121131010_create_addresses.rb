class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.integer :ogc_fid
      t.string :unit
      t.string :number
      t.string :street
      t.string :city
      t.string :district
      t.string :region
      t.string :postcode
      t.string :hashit
      t.st_point :wkb_geometry, geographic: true

      t.timestamps
    end
    add_index :addresses, :wkb_geometry, using: :gist
  end
end

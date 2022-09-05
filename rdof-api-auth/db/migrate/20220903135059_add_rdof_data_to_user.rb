class AddRdofDataToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :db_name, :string
    add_column :users, :tech_used, :string
    add_column :users, :consumer, :boolean
    add_column :users, :upstream, :decimal
    add_column :users, :downstream, :decimal
  end
end

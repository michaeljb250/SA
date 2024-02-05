class CreateMajorpentatonics < ActiveRecord::Migration[7.0]
  def change
    create_table :majorpentatonics do |t|

      t.timestamps
    end
  end
end

class CreateMinorpentatonics < ActiveRecord::Migration[7.0]
  def change
    create_table :minorpentatonics do |t|

      t.timestamps
    end
  end
end

class CreateIndiepops < ActiveRecord::Migration[7.0]
  def change
    create_table :indiepops do |t|

      t.timestamps
    end
  end
end

class CreateDrumones < ActiveRecord::Migration[7.0]
  def change
    create_table :drumones do |t|

      t.timestamps
    end
  end
end

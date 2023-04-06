class CreateAutowahs < ActiveRecord::Migration[7.0]
  def change
    create_table :autowahs do |t|

      t.timestamps
    end
  end
end

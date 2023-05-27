class CreateRocks < ActiveRecord::Migration[7.0]
  def change
    create_table :rocks do |t|

      t.timestamps
    end
  end
end

class CreateDrumlabs < ActiveRecord::Migration[7.0]
  def change
    create_table :drumlabs do |t|

      t.timestamps
    end
  end
end

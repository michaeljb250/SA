class CreateRockdrums < ActiveRecord::Migration[7.0]
  def change
    create_table :rockdrums do |t|

      t.timestamps
    end
  end
end

class CreateHiphopdrums < ActiveRecord::Migration[7.0]
  def change
    create_table :hiphopdrums do |t|

      t.timestamps
    end
  end
end

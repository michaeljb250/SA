class CreatePops < ActiveRecord::Migration[7.0]
  def change
    create_table :pops do |t|

      t.timestamps
    end
  end
end

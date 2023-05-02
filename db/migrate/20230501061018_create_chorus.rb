class CreateChorus < ActiveRecord::Migration[7.0]
  def change
    create_table :chorus do |t|

      t.timestamps
    end
  end
end

class CreateTheories < ActiveRecord::Migration[7.0]
  def change
    create_table :theories do |t|

      t.timestamps
    end
  end
end

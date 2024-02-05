class CreateBluescales < ActiveRecord::Migration[7.0]
  def change
    create_table :bluescales do |t|

      t.timestamps
    end
  end
end

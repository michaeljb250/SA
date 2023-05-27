class CreatePassers < ActiveRecord::Migration[7.0]
  def change
    create_table :passers do |t|

      t.timestamps
    end
  end
end

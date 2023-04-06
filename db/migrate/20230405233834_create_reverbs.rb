class CreateReverbs < ActiveRecord::Migration[7.0]
  def change
    create_table :reverbs do |t|

      t.timestamps
    end
  end
end

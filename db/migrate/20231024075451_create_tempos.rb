class CreateTempos < ActiveRecord::Migration[7.0]
  def change
    create_table :tempos do |t|

      t.timestamps
    end
  end
end

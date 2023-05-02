class CreateVibratos < ActiveRecord::Migration[7.0]
  def change
    create_table :vibratos do |t|

      t.timestamps
    end
  end
end

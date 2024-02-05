class CreateMinorsteps < ActiveRecord::Migration[7.0]
  def change
    create_table :minorsteps do |t|

      t.timestamps
    end
  end
end

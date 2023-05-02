class CreateFreeverbs < ActiveRecord::Migration[7.0]
  def change
    create_table :freeverbs do |t|

      t.timestamps
    end
  end
end

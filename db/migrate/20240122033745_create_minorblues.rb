class CreateMinorblues < ActiveRecord::Migration[7.0]
  def change
    create_table :minorblues do |t|

      t.timestamps
    end
  end
end

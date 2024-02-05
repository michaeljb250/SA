class CreateMinortriads < ActiveRecord::Migration[7.0]
  def change
    create_table :minortriads do |t|

      t.timestamps
    end
  end
end

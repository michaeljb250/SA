class CreateMajortriads < ActiveRecord::Migration[7.0]
  def change
    create_table :majortriads do |t|

      t.timestamps
    end
  end
end

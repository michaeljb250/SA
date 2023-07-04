class CreateSpatialaudios < ActiveRecord::Migration[7.0]
  def change
    create_table :spatialaudios do |t|

      t.timestamps
    end
  end
end

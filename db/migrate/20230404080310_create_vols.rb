class CreateVols < ActiveRecord::Migration[7.0]
  def change
    create_table :vols do |t|
      t.string :name

      t.timestamps
    end
  end
end

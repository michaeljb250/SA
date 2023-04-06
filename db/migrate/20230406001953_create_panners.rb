class CreatePanners < ActiveRecord::Migration[7.0]
  def change
    create_table :panners do |t|

      t.timestamps
    end
  end
end

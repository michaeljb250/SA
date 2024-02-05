class CreateMajorscales < ActiveRecord::Migration[7.0]
  def change
    create_table :majorscales do |t|

      t.timestamps
    end
  end
end

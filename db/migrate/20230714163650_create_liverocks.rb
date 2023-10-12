class CreateLiverocks < ActiveRecord::Migration[7.0]
  def change
    create_table :liverocks do |t|

      t.timestamps
    end
  end
end

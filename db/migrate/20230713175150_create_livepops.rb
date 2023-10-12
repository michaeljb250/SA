class CreateLivepops < ActiveRecord::Migration[7.0]
  def change
    create_table :livepops do |t|

      t.timestamps
    end
  end
end

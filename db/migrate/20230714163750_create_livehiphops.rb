class CreateLivehiphops < ActiveRecord::Migration[7.0]
  def change
    create_table :livehiphops do |t|

      t.timestamps
    end
  end
end

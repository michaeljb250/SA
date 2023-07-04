class CreateLivemixes < ActiveRecord::Migration[7.0]
  def change
    create_table :livemixes do |t|

      t.timestamps
    end
  end
end

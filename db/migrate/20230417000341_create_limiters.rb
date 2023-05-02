class CreateLimiters < ActiveRecord::Migration[7.0]
  def change
    create_table :limiters do |t|

      t.timestamps
    end
  end
end

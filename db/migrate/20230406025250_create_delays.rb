class CreateDelays < ActiveRecord::Migration[7.0]
  def change
    create_table :delays do |t|

      t.timestamps
    end
  end
end

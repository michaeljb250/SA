class CreatePopdrums < ActiveRecord::Migration[7.0]
  def change
    create_table :popdrums do |t|

      t.timestamps
    end
  end
end

class CreateJazzdrums < ActiveRecord::Migration[7.0]
  def change
    create_table :jazzdrums do |t|

      t.timestamps
    end
  end
end

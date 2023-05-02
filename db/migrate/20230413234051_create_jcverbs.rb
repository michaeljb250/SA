class CreateJcverbs < ActiveRecord::Migration[7.0]
  def change
    create_table :jcverbs do |t|

      t.timestamps
    end
  end
end

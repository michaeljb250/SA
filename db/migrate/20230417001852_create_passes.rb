class CreatePasses < ActiveRecord::Migration[7.0]
  def change
    create_table :passes do |t|

      t.timestamps
    end
  end
end

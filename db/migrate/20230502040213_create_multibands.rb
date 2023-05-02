class CreateMultibands < ActiveRecord::Migration[7.0]
  def change
    create_table :multibands do |t|

      t.timestamps
    end
  end
end

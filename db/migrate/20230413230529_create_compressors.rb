class CreateCompressors < ActiveRecord::Migration[7.0]
  def change
    create_table :compressors do |t|

      t.timestamps
    end
  end
end

class CreateTremelos < ActiveRecord::Migration[7.0]
  def change
    create_table :tremelos do |t|

      t.timestamps
    end
  end
end

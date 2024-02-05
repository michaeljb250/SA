class CreateMinorscales < ActiveRecord::Migration[7.0]
  def change
    create_table :minorscales do |t|

      t.timestamps
    end
  end
end

class CreateHipHops < ActiveRecord::Migration[7.0]
  def change
    create_table :hip_hops do |t|

      t.timestamps
    end
  end
end

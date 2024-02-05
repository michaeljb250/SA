class CreateMajorsteps < ActiveRecord::Migration[7.0]
  def change
    create_table :majorsteps do |t|

      t.timestamps
    end
  end
end

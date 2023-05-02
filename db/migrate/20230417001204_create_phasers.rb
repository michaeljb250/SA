class CreatePhasers < ActiveRecord::Migration[7.0]
  def change
    create_table :phasers do |t|

      t.timestamps
    end
  end
end

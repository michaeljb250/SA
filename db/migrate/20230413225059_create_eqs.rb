class CreateEqs < ActiveRecord::Migration[7.0]
  def change
    create_table :eqs do |t|

      t.timestamps
    end
  end
end

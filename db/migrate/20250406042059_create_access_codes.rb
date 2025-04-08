class CreateAccessCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :access_codes do |t|
      t.string :code
      t.boolean :used

      t.timestamps
    end
  end
end

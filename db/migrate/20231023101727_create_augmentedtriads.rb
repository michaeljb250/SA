class CreateAugmentedtriads < ActiveRecord::Migration[7.0]
  def change
    create_table :augmentedtriads do |t|

      t.timestamps
    end
  end
end

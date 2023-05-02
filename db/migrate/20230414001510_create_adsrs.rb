class CreateAdsrs < ActiveRecord::Migration[7.0]
  def change
    create_table :adsrs do |t|

      t.timestamps
    end
  end
end

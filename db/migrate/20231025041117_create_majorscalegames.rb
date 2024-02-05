class CreateMajorscalegames < ActiveRecord::Migration[7.0]
  def change
    create_table :majorscalegames do |t|

      t.timestamps
    end
  end
end

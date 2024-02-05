class CreateMinorscalegames < ActiveRecord::Migration[7.0]
  def change
    create_table :minorscalegames do |t|

      t.timestamps
    end
  end
end

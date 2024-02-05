class CreatePentatonicmajorscales < ActiveRecord::Migration[7.0]
  def change
    create_table :pentatonicmajorscales do |t|

      t.timestamps
    end
  end
end

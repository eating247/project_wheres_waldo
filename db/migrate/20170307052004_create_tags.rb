class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.integer :top
      t.integer :left
      t.string :value

      t.timestamps
    end
  end
end

class RemoveExtraColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :games, :creation_time
  end
end

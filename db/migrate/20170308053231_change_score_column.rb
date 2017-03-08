class ChangeScoreColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :games, :score
    add_column :games, :ongoing, :boolean
  end
end

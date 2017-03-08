class AddCreationTimeToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :creation_time, :datetime
  end
end

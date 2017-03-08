class Game < ApplicationRecord

  def self.get_highest_score
    Game.select("username, finish_time, created_at, (finish_time - created_at) AS difference").order("difference ASC").limit(1)
  end
end

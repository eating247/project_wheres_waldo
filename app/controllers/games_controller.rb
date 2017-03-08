class GamesController < ApplicationController

  def index
    @highest = Game.get_highest_score[0]
    respond_to do |format|
      format.json { render :json => @highest, status: 200 }
    end
  end

  def create
    @game = Game.new(game_params)
    if @game.save 
      respond_to do |format|
        format.json { render :json => @game, status: :created }
      end
    end
  end

  def update
    @game = Game.find(params[:id])
    if @game.update(game_params)
      respond_to do |format|
        format.json { head :no_content }
      end
    end
  end

  private

  def game_params
    params.require(:game).permit(:score, :finish_time, :ongoing, :username)
  end
end

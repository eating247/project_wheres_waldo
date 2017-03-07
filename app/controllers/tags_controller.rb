class TagsController < ApplicationController

  def index
    @tags = Tag.all
    respond_to do |format|
      format.html
      format.json { render :json => @tags, :status => 201 }
    end
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      respond_to do |format|
        format.json { render :json => @tag, status: :created }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, status: 400 }
      end
    end

  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag.destroy
      respond_to do |format|
        format.json { }
      end
    else
      # display error message
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:top, :left, :value)
  end

end

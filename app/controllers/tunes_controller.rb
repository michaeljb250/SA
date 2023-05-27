class TunesController < ApplicationController
  def audio
    send_file Rails.root.join('public', 'tunes', params[:filename]), type: 'audio/mpeg', disposition: 'inline'
  end
end

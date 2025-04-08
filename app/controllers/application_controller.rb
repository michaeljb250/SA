# app/controllers/application_controller.rb (or the relevant controller)
class ApplicationController < ActionController::Base
  before_action :require_access_code, except: [:new, :create]  # Skip on new and create actions

  private

  def require_access_code
    unless session[:access_granted]
      redirect_to new_access_code_path, alert: "You must enter a valid access code first."
    end
  end
end



  # app/controllers/access_codes_controller.rb

  class AccessCodesController < ApplicationController
    SESSION_EXPIRATION_TIME = 1.hour  # Example expiration time

    def create
      if params[:code] == ENV["INSTITUTION_CODE"]
        session[:access_granted] = true
        session[:access_granted_at] = Time.current
        redirect_to root_path, notice: "Access granted."
      else
        redirect_to new_access_code_path, alert: "Invalid or already used code."
      end
    end

    private

    def check_access_expiration
      if session[:access_granted] && session[:access_granted_at]
        if Time.current - session[:access_granted_at] > SESSION_EXPIRATION_TIME
          session.delete(:access_granted)
          session.delete(:access_granted_at)
          redirect_to new_access_code_path, alert: "Access has expired."
        end
      end
    end
  end

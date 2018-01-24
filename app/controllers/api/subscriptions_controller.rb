class Api::SubscriptionsController < Api::BaseController
  def create
    @subscription = Subscription.new(allowed_params)
    if @subscription.save
      render json: { success: true, subscription: @subscription.as_json}, status: :ok
    else
      render json: { success: false }, status: :error
    end
  end
  
  protected
  def allowed_params
    params[:subscription][:address] ||= []
    params.require(:subscription).permit(:name, :email, :gender, :phone, address: [:street, :zipcode, :number, :city])
  end
end

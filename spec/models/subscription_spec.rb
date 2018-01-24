require 'rails_helper'

RSpec.describe Subscription do
  
  before(:each) do
    @subscription_attrs = FactoryBot.subscription_with_address
  end
  
  it "should not save a subscription with an empty name" do
    @subscription_attrs[:name] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with an empty gender" do
    @subscription_attrs[:gender] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with a non-valid gender" do
    @subscription_attrs[:gender] = "quimera"
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with a malformed email" do
    @subscription_attrs[:email] = "incorrect@email"
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with an empty email" do
    @subscription_attrs[:email] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with a malformed phone number" do
    @subscription_attrs[:phone] = "+35772484"
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with an empty phone number" do
    @subscription_attrs[:phone] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with an empty address" do
    @subscription_attrs[:address][0][:street] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with a malformed zipcode" do
    @subscription_attrs[:address][0][:zipcode] = "930222"
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
  
  it "should not save a subscription with an empty zipcode" do
    @subscription_attrs[:address][0][:zipcode] = ""
    expect(Subscription.new(@subscription_attrs).save).to be(false)
  end
end
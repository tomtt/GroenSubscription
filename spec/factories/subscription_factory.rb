FactoryBot.define do
  factory :subscription do
    name "John"
    email  "john@example.com"
    gender "male"
    phone "+31657756849"
  end
end

module FactoryBot
  def self.subscription_with_address
    FactoryBot.attributes_for(:subscription).merge({ address: [{ street: 'Vijzelstraat', number: '39G', city: 'Amsterdam', zipcode: '3429TR' }] })
  end
  
  def self.subscription_with_address_as_if_persisted
    { id: 1 }.merge(FactoryBot.subscription_with_address)
  end
end
class Subscription < ApplicationRecord
  validates :name, :address_street, presence: true
  validates :email, format: /\A(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\z/
  validates :gender, inclusion: { in: %w(male female other) }
  validates :phone, format: /(\A\+[0-9]{2}|\A\+[0-9]{2}\(0\)|\A\(\+[0-9]{2}\)\(0\)|\A00[0-9]{2}|\A0)([0-9]{9}$|[0-9\-\s]{10}\z)/
  validates :address_zipcode, format: /\A[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}\z/i
    
  attr_accessor :address
  
  def initialize(params)
    super(params)
    unpack_address_from(params)
  end
  
  def with_address_unflattened
    { id: id,
      name: name, 
      email: email, 
      gender: gender, 
      phone: phone, 
      address: [{ 
        street: address_street,
        number: address_number,
        city: address_city, 
        zipcode: address_zipcode
      }]
    }
  end
  
  protected
  def unpack_address_from(params)
    address_handler = params[:address].first 
    
    unless address_handler.nil?
      self.address_street = address_handler[:street]
      self.address_number = address_handler[:number]
      self.address_city = address_handler[:city]
      self.address_zipcode = address_handler[:zipcode]
    end
  end
end

class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.string    :name
      t.string    :gender
      t.string    :email
      t.string    :phone
      t.string    :address_street
      t.string    :address_number
      t.string    :address_zipcode
      t.string    :address_city

      t.timestamps
    end
  end
end

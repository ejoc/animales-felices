require 'test_helper'

HOURS = (8..18).to_a

class AppointmentTest < ActiveSupport::TestCase

  test "invalid appointment with invalid attributes" do
    appointment = Appointment.new
    assert_not appointment.valid?
  end

  # test "should not save without start_time" do
  #   appointment = Appointment.new(appointment_params.except(:start_time))
  #   assert_not appointment.save
  # end

  # test "should not save without specialist_id" do
  #   appointment = Appointment.new(appointment_params.except(:specialist_id))
  #   assert_not appointment.save
  # end

  # test "should not save without service_id" do
  #   appointment = Appointment.new(appointment_params.except(:service_id))
  #   assert_not appointment.save
  # end

  # test "should not save without client_name" do
  #   appointment = Appointment.new(appointment_params.except(:client_name))
  #   assert_not appointment.save
  # end

  # test "book appointment" do
  #   appointment = Appointment.new
  #   assert_not article.save
  # end

  private
  def appointment_params
    {
      :service => Service.take,
      :specialist => Specialist.take,
      :client_name => 'Pablo',
      :client_email => 'pablo@hotmail.com',
      :client_phone => '54545122',
      :start_time => dynamic_time,
      :end_time => dynamic_time,
    }
  end

  def dynamic_time
    Date.today.change({
      hour: HOURS.sample,
      min: 0
    })
  end
end
# 定义一个汽车类
class Car():
  """初始化汽车属性"""
  def __init__(self,make,model,year):
    self.make = make
    self.model = model
    self.year = year
    self.odometer_reading = 0
  def get_descriptive_name(self):
    long_name = str(self.year) + ' ' + self.make + ' ' + self.model
    return long_name.title()
  def read_odometer(self):
    print("This car has " + str(self.odometer_reading) + " miles on it")
  def update_odometer(self, mileage):
    if mileage >= self.odometer_reading:
      self.odometer_reading = mileage
    else:
      print("您不能减少驾驶里程")
  def increment_odometer(self,miles):
    self.odometer_reading += miles


# 定义电车类
# 继承于父类
    
class ElectricCar(Car):
  """定义电动汽车的属性"""
  def __init__(self,make,model,year):
    super().__init__(make, model, year)
    self.battery = 70
  def descriptive_battery(self):
    # 打印电车电池的信息
    print("this car has a " + str(self.battery) + "-kWh battery")
my_tesla = ElectricCar('tesla', 'model', '2023')
print(my_tesla.get_descriptive_name())
my_tesla.descriptive_battery()
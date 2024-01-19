responses = {}

polling_active = True
while polling_active:
  # 提示输入被调查者的姓名和回答
  name = input('\n What is your name? ')
  response = input('\nWhich mountain would you like to climb someday? ')

  responses[name] = response
  repeat = input('Would you like to let another person respond?(yes/no) ')

  if repeat == 'no':
    polling_active = False
  print('\n-- Poll Results --')

  for name,response in responses.items():
    print(name + "would like to climb " + response + '.')
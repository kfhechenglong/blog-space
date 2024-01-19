# mess = "Hello Eric"
# print(mess)

# name = "ch he"
# print(name.lower())
# print(name.upper())
# print(name.title())

# message = "天道酬勤\r\n志在必得"
# print(message)

# age = 18

# messgae = "Happy " + str(age) + 'rd Birthday!'
# print(messgae)

# import this


# names = ['he', 'cheng', 'l']
# print(names[0].title())
# names[2] = 'jue dui lingdu'
# print(names)
# names.append('long')
# print(names)
# names.insert(1, '222')
# print(names)
# del names[1]
# print(names)
# last = names.pop()
# print(last, names)
# names.remove('he')
# print(names)

# cars = ['bmw','audi','toyota','subaru']
# # # cars.sort(reverse=True)
# # print(cars)
# # cars.reverse()
# # print(cars)
# # # print(len(cars))

# for item in cars:
#   print(item)

# squares = []
# for value in range(1, 11):
#   square = value**2
#   squares.append(square)
# print(squares)

# prompt = "If you tell us who you are,we can personalize the messages you see."
# prompt+= "\nWhat is your first name? "
# name = input(prompt)
# print("\nHello,"+name+"!")

# prompt = "\nTell me something, and I will repeat it back to you:"
# prompt += "\n Enter 'quit' to end the program \n"

# message = ""
# while message != "quit":
#   message = input(prompt)
#   if message != "quit":
#     print(message)

unconfirmed_users = ['alice', 'brian', 'candace']
confirmed_users = []
while unconfirmed_users:
  current_user = unconfirmed_users.pop()
  print("Verifying user:" + current_user.title())
  confirmed_users.append(current_user)

print('\nThe following users have been confirmed')

for confirmed_user in confirmed_users:
  print(confirmed_user.title())
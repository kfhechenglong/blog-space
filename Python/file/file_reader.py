# with open('pi_digits.txt') as file_object:
#   contents = file_object.read()
#   print(contents.strip())
filename = "pi_digits.txt"
pi_string = ""
try:
  with open(filename) as file_object:
    lines = file_object.readlines()
    print(lines)
  for line in lines:
    pi_string+= line.strip()
except:
  print("未获取到目标文件")

print(pi_string)
print(len(pi_string))
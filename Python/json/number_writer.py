import json
numbers = [2,3,4,5,6]
filename="numbers.json"
# 写入json数据
with open(filename, 'w') as file_object:
  json.dump(numbers, file_object)
# 读取json数据
with open(filename) as f_obj:
  read_json_data= json.load(f_obj)
print(read_json_data)
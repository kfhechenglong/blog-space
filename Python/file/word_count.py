def count_words(filename):
  """计算文件包含了多少个单词"""
  try:
    with open(filename) as file_boject:
      contents = file_boject.read()
  except FileNotFoundError:
    msg = "Sorry, the file" + filename + " does not exist."
    print(msg)
  else:
    words = contents.split()
    num_words = len(words)
    print("The file "+filename + " has about" + str(num_words)+"words")
filename = "alice.txt"
count_words(filename)
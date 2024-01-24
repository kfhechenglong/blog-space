from survey import AnonymousSurvery
question = " What language did you first learn to speak?"
my_survey = AnonymousSurvery(question)
my_survey.show_question()

while True:
  response = input("Language: ")
  if response == "q":
    break
  my_survey.store_response(response)
print("\nThank you to everyone who .......")
my_survey.show_results()
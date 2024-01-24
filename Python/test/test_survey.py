import unittest
from survey import AnonymousSurvery
class TestAnonymousSurvey(unittest.TestCase):
  def setUp(self):
    question = "你学习的第一门语言是什么？"
    self.responses = ['a','b', 'c']
    self.my_survey = AnonymousSurvery(question)
  def test_store_single_response(self):
    self.my_survey.store_response(self.responses[0])
    self.assertIn(self.responses[0], self.my_survey.responses)
  def test_store_three_responses(self):
    for response in self.responses:
      self.my_survey.store_response(response)
    for response in self.responses:
      self.assertIn(response, self.my_survey.responses)
unittest.main()

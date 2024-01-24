import unittest
from name_function import get_formatted_name
class NamesTestCase(unittest.TestCase):
  def test_first_last_name(self):
    formattd_name = get_formatted_name("he", "lingdu")
    self.assertEqual(formattd_name, "He Lingdu")
unittest.main()
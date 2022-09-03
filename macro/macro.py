from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(executable_path='chromedriver.exe')
driver.get('http://localhost:3000/')

input_box = driver.find_element_by_xpath('/html/body/div/div[1]/div/div/div/div/input')
input_box.send_keys('I\'m glad to see you.')
input_box.send_keys(Keys.RETURN)
# Mengimpor modul yang diperlukan
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller
from pyvirtualdisplay import Display

# Inisialisasi virtual display untuk menjalankan browser tanpa GUI 
display = Display(visible=0, size=(800, 800))
display.start()

# Menggunakan chromedriver_autoinstaller untuk menginstal ChromeDriver
chromedriver_autoinstaller.install()

# Konfigurasi opsi Chrome
chrome_options = webdriver.ChromeOptions()

# Daftar opsi yang ingin ditambahkan
options = [
    "--window-size=1200,1200",
    "--ignore-certificate-errors"
]

# Menambahkan opsi-opsi ke dalam chrome_options
for option in options:
    chrome_options.add_argument(option)

class TestTestting():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_testting(self):
    self.driver.get("http://localhost:3000/")
    self.driver.find_element(By.CSS_SELECTOR, "span").click()
    self.driver.find_element(By.ID, "fullName").click()
    self.driver.find_element(By.ID, "fullName").send_keys("Budi")
    self.driver.find_element(By.ID, "email").click()
    self.driver.find_element(By.ID, "email").send_keys("budi@yahoo.com")
    self.driver.find_element(By.ID, "password").click()
    self.driver.find_element(By.ID, "password").send_keys("1111")
    self.driver.find_element(By.XPATH, "//button[@type=\'submit\']").click()
    
if __name__ == "__main__":
    pytest.main()
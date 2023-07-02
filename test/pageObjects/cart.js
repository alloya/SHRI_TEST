const Page = require('./page');

class CartPage extends Page {

  //page locators:
  get orderTable() { return $('.Cart-Table') }
  get btnClearCart() { return $('button.Cart-Clear') }
  get btnSubmitOrder() { return $('button.Form-Submit') }
  get inputName() { return $('#f-name') }
  get inputPhone() { return $('#f-phone') }
  get inputAddress() { return $('#f-address') }
  get validationErrors() { return $('.invalid-feedback') }
  get cartSuccessMessage() { return $('.Cart-SuccessMessage') }
  get orderNumber() { return $('.Cart-Number') }

  async open() {
    await super.open('/')
  }
  //to enter username and password into login form and click login button
  async clearCart() {
    (await this.btnClearCart).click();
  }

  async checkout() {
    (await this.btnSubmitOrder).click();
  }

  async fillForm(name, phone, address) {
    (await this.inputName).sendKeys(name);
    (await this.inputPhone).sendKeys(phone);
    (await this.inputAddress).sendKeys(address);
  }
}

module.exports = new CartPage();
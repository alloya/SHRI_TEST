const Page = require('./page');

class CatalogPage extends Page {

  //page locators:
  get btnAddToCart() { return $('button.ProductDetails-AddToCart') }
  get cartBadge() { return $('.CartBadge text-success') }

  async open() {
    await super.open('/')
  }

  async clickAddToCart() {
    (await this.btnAddToCart).click();
  }

  async isCartBadgeDisplayed() {
    return (await this.cartBadge).isDisplayed()
  }
}

module.exports = new CatalogPage();
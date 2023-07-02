const Page = require('./page');

class CatalogPage extends Page {

  //page locators:
  get productCard() { return $('.ProductItem') }

  async open() {
    await super.open('/')
  }

  async clickLink() {
    (await this.productLink).click();
  }
}

module.exports = new CatalogPage();
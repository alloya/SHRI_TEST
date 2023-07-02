const { assert } = require('chai');

describe('отображение стратических страниц:', async function () {
  it('главная', async function () {
    await this.browser.url('http://localhost:3000/hw/store/');
    await this.browser.assertView('plain', 'body');

    const title = await this.browser.$('.display-3').getText();
    assert.equal(title, 'Welcome to Example store!');
  });

  it('каталог', async function () {
    await this.browser.url('http://localhost:3000/hw/store/catalog');

    const title = await this.browser.$('h1').getText();
    assert.equal(title, 'Catalog');
  });

  it('контакты', async function () {
    await this.browser.url('http://localhost:3000/hw/store/contacts');
    await this.browser.assertView('plain', 'body');

    const title = await this.browser.$('h1').getText();
    assert.equal(title, 'Contacts');
  });

  it('доставка', async function () {
    await this.browser.url('http://localhost:3000/hw/store/delivery');
    await this.browser.assertView('plain', 'body');

    const title = await this.browser.$('h1').getText();
    assert.equal(title, 'Delivery');
  });

  it('пустая корзина', async function () {
    await this.browser.url('http://localhost:3000/hw/store/cart');
    await this.browser.assertView('plain', 'body');

    const title = await this.browser.$('h1').getText();
    assert.equal(title, 'Shopping cart');
  });
});

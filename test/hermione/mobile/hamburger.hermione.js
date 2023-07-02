const { assert, expect, should } = require('chai');

describe('гамбургер-меню', async function () {
  it('открывается при клике на иконку', async function ({}) {

    await this.browser.url('http://localhost:3000/hw/store/');

    const burger = await this.browser.$('.Application-Toggler');
    const menu = await this.browser.$('.Application-Menu');
    const classs = await menu.getAttribute('class');
    expect(classs).contain('collapse')
    await burger.click();
    assert.isTrue(await menu.isDisplayed())
    await this.browser.assertView('plain', 'nav');

  });

  it('закрывается при клике на элемент списка меню', async function () {
    await this.browser.url('http://localhost:3000/hw/store/');
    const burger = await this.browser.$('.Application-Toggler');
    await burger.click();
    const menuItem = await this.browser.$$('.nav-link')[1];
    await menuItem.click();
    assert.isFalse(await menuItem.isDisplayed())
  });
});

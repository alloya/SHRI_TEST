const { assert } = require("chai")

class Header {
  get menuElement() { return $('.nav-link') }
  get cartLink() { return $('//*[@id="root"]/div/nav/div/div/div/a[4]')}
  get burgerButton() { return $('.Application-Toggler') }
  get navBar() { return $('.Application-Menu.navbar-collapse') }

  async clickBurger() {
    (await this.burgerButton).click()
  }

  async getCartCounter(text) {
    return  await (await this.cartLink).getText().contains('(1)')
  }

  async burgerMenuCanExpand() {
    const nav = await (await this.navBar).getAttribute('class');
    assert(nav).contains('collapse')
    await this.clickBurger();
    return !(await nav.getAttribute('class')).contains('collapse')
  }
}

module.exports = new Header();

// module.exports = {
//   menuElement: '.nav-link',
//   cartLink: '//*[@id="root"]/div/nav/div/div/div/a[4]',
//   burgerButton: '.Application-Toggler',
//   navBar: '.Application-Menu.navbar-collapse',
// }
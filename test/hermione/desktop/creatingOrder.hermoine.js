
describe('процесс создания заказа', async function () {
  it('счетчик корзины увеличивается', async function ({ }) {

    await this.browser.url('http://localhost:3000/hw/store/catalog/0');

    const button = await this.browser.$('.ProductDetails:nth-child(1').$('p:nth-child(4)')
    await button.assertView('plain');
    await this.browser.$('.ProductDetails-AddToCart').click();

    await button.assertView('clicked', {
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
    // const badge = await this.browser.$('.CartBadge');
    // assert.isTrue(await badge.isDisplayed());

    // const cart = await this.browser.$$('.nav-link')[3];
    // assert.equal(await cart.getText(), 'Cart (1)');


  });

  it('в корзине отображается товар и форма заявки', async function ({ }) {
    await this.browser.url('http://localhost:3000/hw/store/catalog/0');
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.url('http://localhost:3000/hw/store/cart');

    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.Cart-Name', '.Cart-Price', '.Cart-Total', '.Cart-OrderPrice'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });

  });

  it('в корзине отображаются ошибки при сабмите пустой формы', async function ({ }) {
    await this.browser.url('http://localhost:3000/hw/store/catalog/0');
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.url('http://localhost:3000/hw/store/cart');

    const form = await this.browser.$('#root > div > div > div > div:nth-child(3)');
    await form.assertView('plain');
    await this.browser.$('.Form-Submit').click();
    await form.assertView('clicked', {
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
  });

  it('отображается сообщение об успехе при сабмите корректной формы', async function ({ }) {
    await this.browser.url('http://localhost:3000/hw/store/catalog/0');
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.url('http://localhost:3000/hw/store/cart');

    await this.browser.$('#f-name').setValue('Name');
    await this.browser.$('#f-phone').setValue('9129034982');
    await this.browser.$('#f-address').setValue('ktybyf 12');
    await this.browser.$('.Form-Submit').click();
    await this.browser.assertView('submited', 'body', {
      ignoreElements: ['.Cart-Number'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
  });

  it('страница товара отображается правильно', async function ({ }) {
    await this.browser.url('http://localhost:3000/hw/store/catalog/0');
    await this.browser.$('.ProductDetails-AddToCart').click();
    await this.browser.url('http://localhost:3000/hw/store/cart');

    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.Cart-Name', '.Cart-Price', '.Cart-Total', '.Cart-OrderPrice'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });

  });
});

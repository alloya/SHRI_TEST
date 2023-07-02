const { assert } = require('chai');

describe('отображение адаптивной верстки каталога:', async function () {

  it('1920x1280', async function () {
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    this.browser.setWindowSize(1920, 3480);
    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.card-title', '.card-text'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
  });


  it('1366x768', async function () {
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    this.browser.setWindowSize(1366, 3100);
    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.card-title', '.card-text'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
  });

  it('740x1080', async function () {
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    this.browser.setWindowSize(740, 6080);
    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.card-title', '.card-text'],
      tolerance: 5,
      antialiasingTolerance: 4,
      allowViewportOverflow: false,
      captureElementFromTop: true,
      compositeImage: false,
      screenshotDelay: 300,
      screenshotMode: 'viewport'
    });
  });

  it('360x800', async function () {
    this.browser.debug()
    const userListMock = await this.browser.mock('**', {
      method: 'get'
    })
    await this.browser.url('http://localhost:3000/hw/store/catalog');
    userListMock.respond(mockData);
    this.browser.setWindowSize(360, 13000);
    await this.browser.assertView('plain', 'body', {
      ignoreElements: ['.card-title', '.card-text'],
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


const mockData = [
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
  {
    "id": 0,
    "name": "Handcrafted Chicken",
    "price": 725
  },
]

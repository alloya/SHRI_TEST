import React from 'react';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { container } from 'webpack';
import { Application } from '../../src/client/Application';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Тесты хедера', () => {

  it('имеет 5 корректных ссылок', async () => {

    const expectedLinks = [
      { text: 'Example store', href: '/hw/store/' },
      { text: 'Catalog', href: '/hw/store/catalog' },
      { text: 'Delivery', href: '/hw/store/delivery' },
      { text: 'Contacts', href: '/hw/store/contacts' },
      { text: 'Cart', href: '/hw/store/cart' }
    ];

    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    render(application);
    const nav = await screen.findByRole('navigation')
    const links = await within(nav).findAllByRole('link');

    expect(links.length).toBe(5);

    links.forEach((link, index) => {
      expect(link).toHaveTextContent(expectedLinks[index].text);
      expect(link).toHaveAttribute('href', expectedLinks[index].href);
    });
  });

  it('бургер меню открывается и закрывается по клику', async () => {
    window.innerWidth = 400;
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { container } = render(application);
    const nav = await screen.findByRole('navigation')
    const burgerButton = await within(nav).getByRole('button');
    const dropdown = await container.getElementsByClassName('Application-Menu')[0];
    const links = await within(dropdown as HTMLElement).findAllByRole('link');
    expect(dropdown).toHaveClass('collapse');

    await fireEvent.click(burgerButton);
    expect(dropdown).not.toHaveClass('collapse');
    await fireEvent.click(burgerButton);
    expect(dropdown).toHaveClass('collapse');


    await fireEvent.click(burgerButton);
    expect(dropdown).not.toHaveClass('collapse');
    console.log(links[0])
    await fireEvent.click(links[0]);
    expect(dropdown).toHaveClass('collapse');
  })
});
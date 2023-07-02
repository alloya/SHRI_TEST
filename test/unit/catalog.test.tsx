import React from 'react';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, within, waitFor, waitForElementToBeRemoved, queryByText, act, getAllByTestId, findByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Catalog } from '../../src/client/pages/Catalog';
import { server } from '../../src/mocks/server'
import { handlers, mockData, mockDataFull } from '../../src/mocks/handlers';
import { assert } from 'console';
import { ProductDetails } from '../../src/client/components/ProductDetails';

describe('тесты страницы Catalog', () => {
  it('проверяет правильность ссылок', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    server.use(handlers[0])
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );

    await waitForElementToBeRemoved(() => queryByText(container, 'LOADING'));

    const productItems = await screen.findAllByTestId(/\d+/);

    productItems.forEach((productItem) => {
      const linkElement = productItem.querySelector('a');
      const name = productItem.querySelector('.ProductItem-Name')?.textContent;
      const price = productItem.querySelector('.ProductItem-Price')?.textContent?.substring(1);
      const href = linkElement?.getAttribute('href');
      const dataTestId = productItem?.getAttribute('data-testid');

      expect(name?.length).not.toBe(0);
      expect(price?.length).not.toBe(0);
      expect(href).toBe(`/catalog/${dataTestId}`);
    });
  });

  it('проверяет появление Item in cart на странице продукта', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    server.use(handlers[0])

    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetails product={mockDataFull[0]} />
        </BrowserRouter>
      </Provider>
    );
    const item = [mockData[0]];

    const add = await screen.findByText('Add to Cart');
    fireEvent.click(add);
    assert(await screen.findByText('Item in cart'));

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetails product={mockDataFull[0]} />
        </BrowserRouter>
      </Provider>
    );
    assert(await screen.findByText('Item in cart'));
  });
});
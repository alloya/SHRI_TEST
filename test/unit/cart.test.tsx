import React from 'react';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { container } from 'webpack';
import { Application } from '../../src/client/Application';
import { render, fireEvent, screen, within, waitFor, waitForElementToBeRemoved, queryByText, act, getAllByTestId, findByText, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Catalog } from '../../src/client/pages/Catalog';
import { server } from '../../src/mocks/server'
import { handlers, mockData, mockDataFull, mockForm } from '../../src/mocks/handlers';
import { CartItem, CartState } from '../../src/common/types';
import { assert } from 'console';
import { createMemoryHistory } from 'history';
import { Product } from '../../src/client/pages/Product';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import { Cart } from '../../src/client/pages/Cart';

describe('тесты страницы Cart', () => {
  it('проверяет правильность отображения продукта в корзине', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const cartState: CartState = [mockData[0]].reduce((state, product) => {
      const { id, name, price } = product;
      const cartItem: CartItem = { name, price, count: 1 };
      return { ...state, [id]: cartItem };
    }, {});
    cart.setState(cartState);

    const store = initStore(api, cart);
    server.use(handlers[0])
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByRole('table')).not.toBeNull();
    const noItems = await screen.queryByText('Cart is empty');
    expect(noItems).toBeNull();

    const productItems = await screen.findAllByTestId(/\d+/);

    productItems.forEach((productItem) => {
      const dataTestId = productItem.getAttribute('data-testid');
      const mockItem = mockData.find(el => el.id == Number(dataTestId));

      const name = productItem.querySelector('.Cart-Name')?.textContent;
      const price = Number(productItem.querySelector('.Cart-Price')?.textContent?.substring(1));
      const count = Number(productItem.querySelector('.Cart-Count')?.textContent);
      const total = Number(productItem.querySelector('.Cart-Total')?.textContent?.substring(1));

      expect(name).toBe(mockItem?.name);
      expect(price).toBe(mockItem?.price);
      expect(count).toBe(1);
      expect(total).toBe(price)
    });
  });

  it('проверяет, что корзина очищается по клику Clear', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const cartState: CartState = [mockData[0]].reduce((state, product) => {
      const { id, name, price } = product;
      const cartItem: CartItem = { name, price, count: 1 };
      return { ...state, [id]: cartItem };
    }, {});
    cart.setState(cartState);

    const store = initStore(api, cart);
    server.use(handlers[0])
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const table = await container.querySelector('.Form');
    expect(table).not.toBeNull();
    const noItems = await screen.queryByText('Cart is empty');
    expect(noItems).toBeNull();

    const clear = await container.querySelector('.Cart-Clear');
    fireEvent.click(clear!);

    const cartDeleted = await screen.queryByRole('table');
    expect(cartDeleted).toBeNull();
    const cartEmpty = await screen.queryByText('Cart is empty');

    expect(cart.getState()).toStrictEqual({})
  });

  it('проверяет отображение ошибок формы', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const cartState: CartState = [mockData[0]].reduce((state, product) => {
      const { id, name, price } = product;
      const cartItem: CartItem = { name, price, count: 1 };
      return { ...state, [id]: cartItem };
    }, {});
    cart.setState(cartState);

    const store = initStore(api, cart);
    server.use(handlers[0])
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const form = await container.querySelector('.Form');
    const submit = await container.querySelector('.Form-Submit');
    expect(submit).not.toBeNull();

    const name = await form?.querySelector('.Form-Field_type_name');
    const phone = await form?.querySelector('.Form-Field_type_phone');
    const address = await form?.querySelector('.Form-Field_type_address');
    await fireEvent.click(submit!);

    expect(name?.getAttribute('class')).toContain('is-invalid');
    expect(phone?.getAttribute('class')).toContain('is-invalid');
    expect(address?.getAttribute('class')).toContain('is-invalid');

    await fireEvent.change(name!, { target: { value: mockForm.name } });
    await fireEvent.click(submit!);

    expect(name?.getAttribute('class')).not.toContain('is-invalid');
    expect(phone?.getAttribute('class')).toContain('is-invalid');
    expect(address?.getAttribute('class')).toContain('is-invalid');

    await fireEvent.change(phone!, { target: { value: mockForm.name } });
    await fireEvent.click(submit!);

    expect(name?.getAttribute('class')).not.toContain('is-invalid');
    expect(phone?.getAttribute('class')).toContain('is-invalid');
    expect(address?.getAttribute('class')).toContain('is-invalid');

    await fireEvent.change(phone!, { target: { value: mockForm.phone } });
    await fireEvent.click(submit!);

    expect(name?.getAttribute('class')).not.toContain('is-invalid');
    expect(phone?.getAttribute('class')).not.toContain('is-invalid');
    expect(address?.getAttribute('class')).toContain('is-invalid');

    await fireEvent.change(address!, { target: { value: mockForm.address } });
    await fireEvent.click(submit!);

    expect(name?.getAttribute('class')).not.toContain('is-invalid');
    expect(phone?.getAttribute('class')).not.toContain('is-invalid');
    expect(address?.getAttribute('class')).not.toContain('is-invalid');
  });

  it('проверяет, что заказ можно отправить', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const cartState: CartState = [mockData[0]].reduce((state, product) => {
      const { id, name, price } = product;
      const cartItem: CartItem = { name, price, count: 1 };
      return { ...state, [id]: cartItem };
    }, {});
    cart.setState(cartState);

    const store = initStore(api, cart);
    server.use(handlers[1])
    const { container, rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    const form = await container.querySelector('.Form');
    const submit = await container.querySelector('.Form-Submit');
    const name = await form?.querySelector('.Form-Field_type_name');
    const phone = await form?.querySelector('.Form-Field_type_phone');
    const address = await form?.querySelector('.Form-Field_type_address');

    await fireEvent.change(name!, { target: { value: mockForm.name } });
    await fireEvent.change(phone!, { target: { value: mockForm.phone } });
    await fireEvent.change(address!, { target: { value: mockForm.address } });

    await fireEvent.click(submit!);

    await waitFor(() => {
      expect(container.querySelector('.Cart-SuccessMessage')).toBeInTheDocument()
    })
    const table = await screen.queryByRole('table');
    expect(table).toBeNull();
    expect(await container.querySelector('Form')).toBeNull();
    expect(await container.querySelector('.Cart-SuccessMessage')).toBeVisible();
  });
});
import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="fullname">
            Nome Completo
            <input
              type="text"
              data-testid="checkout-fullname"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              data-testid="checkout-email"
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              data-testid="checkout-cpf"
              type="text"
            />
          </label>
          <label htmlFor="phone">
            Telefone
            <input
              data-testid="checkout-phone"
              type="text"
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              data-testid="checkout-cep"
              type="text"
            />
          </label>
          <label htmlFor="adress">
            Endereço
            <input
              data-testid="checkout-address"
              type="text"
            />
          </label>
          <button type="button">Confirmar</button>
        </form>
      </div>
    );
  }
}

export default Checkout;

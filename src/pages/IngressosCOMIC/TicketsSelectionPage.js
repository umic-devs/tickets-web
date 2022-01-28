import React, { useState } from "react";
import { CartSummary, ProductSelection } from '../../components'
import { ProductsService } from '../../services'

export default function TicketsSelectionPage({ setStep, formData, setFormData }) {
  const products = ProductsService.fetchProducts()
  const [cart, setCart] = useState([])

  function updateCart(item) {
    const nextCart = composeCart({ cart, item })
    setCart(nextCart)
  }

  function handleNextStep() {
    setStep(3);
  }

  return (
    <>
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Inscrição COMIC 2022</h1>

        <p className="lead">
          Selecione quantos ingressos de cada tipo deseja pedir
        </p>
      </div>

      <div className="row justify-content-between align-items-center mb-5">
        <div className="col-6 ">
          <button
            className="btn px-0 text-primary"
            onClick={() => setStep(1)}
          >
            {"<-"} Voltar
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <div>
            {
              products.map((product) => (
                <ProductSelection
                  key={product.sku}
                  product={product}
                  onSelect={updateCart}
                />
              ))
            }
          </div>
        </div>

        <div className="col-4">
          <CartSummary
            cart={cart}
            onNextStep={handleNextStep}
          />
        </div>
      </div>
    </>
  );
}

function composeCart({ cart, item }) {
  const nextCart = cart.filter(cartItem => cartItem.product.sku !== item.product.sku)
  if(!item.amount) return nextCart

  return [item, ...nextCart]
}
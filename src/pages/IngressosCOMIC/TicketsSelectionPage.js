import React, { useContext } from "react";
import { CartContext } from "../../App";
import { CartSummary, ProductSelection } from '../../components'
import { ProductsService } from '../../services'

export default function TicketsSelectionPage({ setStep, formData, setFormData }) {
  const products = ProductsService.fetchProducts()
  const { cart, updateCart } = useContext(CartContext)

  function handleNextStep() {
    setStep(3);
  }

  return (
    <>
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Inscrição COMIC 2022</h1>

        <p className="lead">
          Quantos ingressos de cada tipo deseja pedir?
        </p>
      </div>

      <div className="row justify-content-between align-items-center mb-3">
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
              products.map((product) => {
                const defaultAmount = composeDefaultAmount({ cart, product })

                return (
                  <ProductSelection
                    key={product.sku}
                    product={product}
                    defaultAmount={defaultAmount}
                    onSelect={updateCart}
                  />
                )
              })
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

function composeDefaultAmount({ cart, product }) {
  const currentItem = cart.find((item) => item.product.sku === product.sku)
  return currentItem?.amount || 0
}
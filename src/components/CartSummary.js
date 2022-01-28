import React from 'react'
import { convertCurrency } from '../helpers'

export default function CartSummary({ cart, onNextStep }) {
  const valueTotal = composeTotal(cart)
  const amountItems = composeAmount(cart)

  return (
    <div className="bg-gray p-4">
      <h6>Resumo do pedido</h6>

      { !cart.length && ( <p>Nenhum ingresso selecionado</p> ) }

      <ul>
        {
          cart.map(item => (
            <li
              key={`cart-item-${item.product.sku}`}
              className="mb-3"
            >
              <p className="mb-0">
                {item?.product.title}
              </p>

              <small>
                {item?.amount}x {convertCurrency(item?.product.price)}
              </small>
            </li>
          ))
        }
      </ul>
    
      {
        !!amountItems && (
          <>
            <h6 className="mt-3">
              Total ({ amountItems } itens): { convertCurrency(valueTotal) }
            </h6>
            
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={onNextStep}
            >
              Continuar
            </button>
          </>
        )
      }

    </div>
  )
}

function composeTotal (cart) {
  return cart.reduce((acc, item) => {
    const subtotal = Number(item.amount) * Number(item.product.price)
    return acc + subtotal
  }, 0)
}

function composeAmount (cart) {
  return cart.reduce((acc, item) => {
    return acc + Number(item.amount)
  }, 0)
}
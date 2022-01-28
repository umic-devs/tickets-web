import React, { useState, useEffect } from 'react'
import { convertCurrency, useDidMountEffect } from '../helpers'

export default function ProductSelection({ onSelect, product }) {
  const [amount, setAmount] = useState(0)

  useDidMountEffect(() => {
    onSelect({ product, amount: Number(amount) })
  }, [amount])

  return (
    <div className="card mb-3 box-shadow">
      <h5 className="card-header">
        { product.title }
      </h5>

      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h4 className="card-title">
              { convertCurrency(product.price) } 
            </h4>

            <p className="card-text">
              {
                product.description
              }
            </p>
          </div>

          <div className="col-4">
            <label>Quantidade:</label>
            <select
              className="form-control"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            >
              {Array(21)
                .fill(1)
                .map((_, index) => (
                  <option key={`${product.sku}-${index}`} value={index}>
                    {index}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

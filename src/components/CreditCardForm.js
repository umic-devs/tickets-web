import React from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { Spinner } from '../components'
import { useForm } from "react-hook-form";

export default function CreditCardForm({ formData, onSubmit, isLoading }) {
  const { register, handleSubmit } = useForm();

  const totalValue = composeCurrency(formData.total)

  return <form onSubmit={handleSubmit(onSubmit)}>
    <div className="row">
      <div className="col-sm-6">
        <div className="card">

          <div className="card-header text-right">
            <small>compra segura</small> <FaLock />
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    className="form-control"
                    disabled={isLoading}
                    id="name"
                    type="text"
                    placeholder="Nome que está no cartão"
                    {...register("cardHolderName", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="ccnumber">Número do Cartão</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      disabled={isLoading}
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      {...register("cardNumber", { required: true })}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <FaCreditCard />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-4">
                <label htmlFor="ccmonth">Mês</label>
                <input
                  className="form-control"
                  disabled={isLoading}
                  id="ccmonth"
                  type="text"
                  placeholder="MM"
                  {...register("cardExpirationMonth", { required: true })}
                />
              </div>

              <div className="form-group col-sm-4">
                <label htmlFor="ccyear">Ano</label>
                <input
                  className="form-control"
                  disabled={isLoading}
                  id="ccyear"
                  type="text"
                  placeholder="AAAA"
                  {...register("cardExpirationYear", { required: true })}
                />
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    className="form-control"
                    disabled={isLoading}
                    id="cvv"
                    type="text"
                    placeholder=""
                    {...register("cardSecurityCode", { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button
              className="btn btn-lg btn-primary btn-block"
              disabled={isLoading}
              type="submit"
            >
              {
                !isLoading
                  ? `Finalizar pedido (${totalValue})`
                  : <Spinner />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
}

function composeCurrency(totalInCents) {
  return (totalInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
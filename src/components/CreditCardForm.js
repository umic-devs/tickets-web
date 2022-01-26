import React from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { Spinner } from '../components'
import { useForm } from "react-hook-form";
import {
  CREDIT_CARD_PATTERN,
  CVV_PATTERN,
  FULL_NAME_PATTERN,
  MONTH_PATTERN,
  YEAR_PATTERN,
} from '../constants'


export default function CreditCardForm({ formData, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
                    className={`form-control ${errors.cardHolderName && 'is-invalid'}`}
                    disabled={isLoading}
                    id="name"
                    type="text"
                    placeholder="Nome que está no cartão"
                    {...register("cardHolderName", {
                        required: true,
                        pattern: FULL_NAME_PATTERN
                    })}
                  />

                  {errors.cardHolderName && (
                    <div className="invalid-feedback text-left">
                      Nome inválido
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label htmlFor="ccnumber">Número do Cartão</label>
                  <div className="input-group">
                    <input
                      className={`form-control ${errors.cardNumber && 'is-invalid'}`}
                      disabled={isLoading}
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      {...register("cardNumber", {
                        required: true,
                        pattern: CREDIT_CARD_PATTERN
                      })}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <FaCreditCard />
                      </span>
                    </div>
                  </div>

                  {errors.cardNumber && (
                    <div className="invalid-feedback text-left">
                      Numero de cartão inválido
                    </div>
                  )}
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
                  {...register("cardExpirationMonth", {
                    required: true,
                    pattern: MONTH_PATTERN
                  })}
                />

                {errors.cardExpirationMonth && (
                  <div className="invalid-feedback text-left">
                    Mes inválido
                  </div>
                )}
              </div>

              <div className="form-group col-sm-4">
                <label htmlFor="ccyear">Ano</label>
                <input
                  className="form-control"
                  disabled={isLoading}
                  id="ccyear"
                  type="text"
                  placeholder="AAAA"
                  {...register("cardExpirationYear", {
                    required: true,
                    pattern: YEAR_PATTERN
                  })}
                />

                {errors.cardExpirationYear && (
                  <div className="invalid-feedback text-left">
                    Ano inválido
                  </div>
                )}
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    className="form-control"
                    disabled={isLoading}
                    id="cvv"
                    type="text"
                    placeholder="000"
                    {...register("cardSecurityCode", {
                      required: true,
                      pattern: CVV_PATTERN
                     })}
                  />

                  {errors.cardSecurityCode && (
                    <div className="invalid-feedback text-left">
                      CVV inválido
                    </div>
                  )}
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
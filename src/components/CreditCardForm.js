import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { sendCreditCardCharge } from "../services/pagseguro.service.js";

export default function CreditCardForm({ formData, onSubmit, isLoading }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpirationMonth, setCardExpirationMonth] = useState("");
  const [cardExpirationYear, setCardExpirationYear] = useState("");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const pedido = localStorage.getItem("pedido");
    const DESCRIPTION = "Pagamento do pedido";

    onSubmit({
      referenceId: pedido,
      description: DESCRIPTION,
      value: formData.total,
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      cardSecurityCode,
      cardHolderName,
    });
  };

  const resetForm = () => {
    setCardNumber("");
    setCardExpirationMonth("");
    setCardExpirationYear("");
    setCardSecurityCode("");
    setCardHolderName("");
  };

  return !isLoading ? (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="mb-3">
            <h2>Inscrição COMIC 2022</h2>
            <h4>Dados de quem irá retirar o pedido</h4>
            <p>
              <strong>
                Preencha os campos abaixo com as informações pessoais de quem
                irá retirar o(s) ingresso(s)
              </strong>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <strong>Cartão de Crédito</strong>
              <small>Insira os detalhes do seu cartão</small>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Nome que está no cartão"
                      value={cardHolderName}
                      onChange={(event) =>
                        setCardHolderName(event.target.value)
                      }
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
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        autoComplete="email"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
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
                    id="ccmonth"
                    type="text"
                    placeholder="MM"
                    value={cardExpirationMonth}
                    onChange={(event) =>
                      setCardExpirationMonth(event.target.value)
                    }
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="ccyear">Ano</label>
                  <input
                    className="form-control"
                    id="ccyear"
                    type="text"
                    placeholder="AAAA"
                    value={cardExpirationYear}
                    onChange={(event) =>
                      setCardExpirationYear(event.target.value)
                    }
                  />
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="cvv">CVV/CVC</label>
                    <input
                      className="form-control"
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cardSecurityCode}
                      onChange={(event) =>
                        setCardSecurityCode(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-sm btn-success float-right"
                type="submit"
              >
                <i className="mdi mdi-gamepad-circle" />
                Enviar
              </button>

              <button
                className="btn btn-sm btn-danger"
                type="button"
                onClick={resetForm}
              >
                <i className="mdi mdi-lock-reset" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  ) : (
    "carregando"
  );
}

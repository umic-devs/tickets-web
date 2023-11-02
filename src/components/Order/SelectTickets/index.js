import React, { useContext } from "react";

import ticketOptions from "consts/ticketOptions";
import { TicketsContext } from "context/tickets";

export default function SelectTickets() {
  const { selectedTickets, setSelectedTickets } = useContext(TicketsContext);

  function getTotalPrice() {
    var totalPrice = 0;
    ticketOptions.map((item) => totalPrice += (selectedTickets[item.id] || 0) * item.price);

    return totalPrice;
  }

  const onSubmit = () => {
    const total = getTotal();
    setFormData({ ...formData, total });
    setStep(2);
  };

  const renderTicketItems = ticketOptions.map((item, index) =>
    <div className="col-12 my-1 mb-3" key={"ticket_" + index}>
      <div className="row">
        <div className="col-8">
          <p className="ingresso-item-type">
            {item.name + " "}<small>{item.info}</small>
          </p>
          <p className="ingresso-item-price">
            R$ {item.price},00
          </p>
        </div>
        <div className="col-4 my-auto">
          <select
            className="form-control form-control-lg"
            value={selectedTickets[item.id] || 0}
            onChange={(e) =>
              setSelectedTickets({ ...selectedTickets, [item.id]: Number(e.target.value) })
            }
          >
            {Array(11)
              .fill(1)
              .map((_, index) => (
                <option key={`${item.id}_${index}`} value={index}>
                  {index}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  )

  const renderResumeItems = ticketOptions.map((item, index) =>
    selectedTickets[item.id] > 0 && (
      <div key={"ticket_" + index}>
        <p className="mb-0">
          <small>
            {selectedTickets[item.id] || 0}x Inteira
          </small>
        </p>
        <p className="mb-1">
          <small>
            R${" " + (selectedTickets[item.id] * item.price)},00
          </small>
        </p>
      </div>
    )
  )

  return (
    <div className="row justify-content-center">

      <div className="col-12 col-md-9">
        <div className="row mb-2">

          <div className="col-12 col-lg-8 mb-2">
            <div className="row">
              <div className="col-12 my-1">
                <p className="ingresso-item-title mb-0">
                  INSCRIÇÃO COMPLETA
                </p>
                <small className="mb-2" style={{ lineHeight: "1rem" }}>
                  ENTRADAS + ALIMENTAÇÃO + ALOJAMENTO
                </small>

                <div className="row">
                  {renderTicketItems}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 bg-gray p-3">
            <h6>Resumo do pedido</h6>

            {renderResumeItems}
            {getTotalPrice() > 0 && (
              <h6 className="mt-3">Total: R$ {getTotalPrice()},00</h6>
            )}
          </div>
        </div>

        <div className="row justify-content-end align-items-center">
          <div className="col-8 col-md-4 text-right">
            {getTotalPrice() > 0 ? (
              <button
                className="btn btn-primary btn-block"
                onClick={() => onSubmit()}
              >
                Continuar
              </button>
            ) : (
              <small>Escolha um ingresso</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

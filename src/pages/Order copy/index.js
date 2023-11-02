import React, { useState } from "react";
import { db, store } from "../../services/firebase";
import { zeroFill } from "../../services/numbers.service";

import Navbar from "../../components/Navbar/Navbar";
import SelectTickets from "./SelectTickets";
import CustomerForm from "./CustomerForm";
import TicketsForm from "./TicketsForm";
//import Checkout from "./Checkout";
//import Result from "./Result";

export default function IngressosCOMIC() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    full: 0,
    half: 0,
  });

  const formDataProps = {
    formData: formData,
    setFormData: setFormData,
  };

  const getIngressosData = (data, tipo, index, id) => ({
    id: id,
    tipo: tipo,
    nome: data[`nome_${tipo}_${index}`],
    sobrenome: data[`sobrenome_${tipo}_${index}`],
    email: data[`email_${tipo}_${index}`],
    telefone: data[`telefone_${tipo}_${index}`],
  });

  async function handleFormSubmit(data) {
    setSent(true);

    let ingressosRef = db.ref("COMIC24");
    
    await ingressosRef
      .get(ingressosRef)
      .then(async (snapshot) => {
        let result = snapshot.val();
        console.log(result);

        let totalPedidos = result.pedidos;
        let totalIngressos = result.ingressos;
        
        const newPedidoID = totalPedidos + 1;
        const newPedidoName = `P${zeroFill(newPedidoID, 4)}`;

        var batch = store.batch();

        // envia dados gerais do pedido
        let pedidoRef = store.collection("COMIC24").doc(newPedidoName);
        batch.set(pedidoRef, {
          id: newPedidoID,
          status: "PENDENTE",
          datetime: new Date(),
          total: data.total,
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          igreja: data.igreja,
          cidade: data.cidade,
          qtd_ingressos: {
            full: data.full,
            half: data.half,
          },
        });

        // envia dados dos ingressos
        let newIngressoID = totalIngressos;

        // Normal
        for (var i = 0; i < formData.full; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let newIngressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            newIngressoRef,
            getIngressosData(data, "full", i + 1, newIngressoID)
          );
        }
        // Infantil
        for (var i = 0; i < formData.half; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let newIngressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            newIngressoRef,
            getIngressosData(data, "half", i + 1, newIngressoID)
          );
        }

        await ingressosRef
          .update({
            pedidos: newPedidoID,
            ingressos: newIngressoID,
          })
          .then(async () => {
            await batch
              .commit()
              .then(async () => {
                // TODO: pagSeguro
                // localStorage.removeItem("step4Data"); // TODO: uncomment this line to clear localStorage
                localStorage.setItem("pedido", newPedidoName); // TODO: uncomment this line to clear localStorage
                localStorage.setItem("forma_pagamento", data.formaPagamento); // TODO: uncomment this line to clear localStorage
                // sendNewOrderMail(data); // TODO: send email
                setSent(false);
                alert(
                  `PEDIDO ${newPedidoName}.\n\nUm email de confirmação chegará em breve!`
                );
                // setStep(5); TODO
              })
              .catch((error) => {
                console.error(error);
                setSent(false);
                alert("Erro no pedido1! Tente novamente mais tarde!");
                setStep(1);
              });
          })
          .catch((error) => {
            console.log(error);
            setSent(false);
            alert("Erro no pedido2! Tente novamente mais tarde!");
          });
      })
      .catch((error) => {
        console.error(error);
        setSent(false);
        alert("Erro no pedido3! Tente novamente mais tarde!");
      });
  }

  return (
    <>
      <Navbar />
      <section className="py-3">
        <div className="container">
          {step === 1 && <SelectTickets setStep={setStep} {...formDataProps} />}
          {step === 2 && <CustomerForm setStep={setStep} {...formDataProps} />}
          {step === 3 && (
            <TicketsForm
              sent={sent}
              setSent={setSent}
              setStep={setStep}
              {...formDataProps}
              handleFormSubmit={handleFormSubmit}
            />
          )}
          {/* {step === 4 && <Checkout {...formDataProps} />} */}
        </div>
      </section>
    </>
  );
}

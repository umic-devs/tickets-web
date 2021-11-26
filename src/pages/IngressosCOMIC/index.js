import React, { useState, useEffect } from "react";
import { db, store } from "../../services/firebase";
import { zeroFill } from "../../services/numbers.service";

import Navbar from "../../components/Navbar";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

export default function IngressosCOMIC() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    qtd_sem_alimentacao: 0,
    qtd_sem_alimentacao_meia: 0,
    qtd_com_alimentacao: 0,
    qtd_com_alimentacao_meia: 0,
  });
  const formDataProps = {
    formData: formData,
    setFormData: setFormData,
  };

  const ingressosData = {
    sem_int: [formData.qtd_sem_alimentacao, "Sem Alimentação (Inteira)"],
    sem_meia: [formData.qtd_sem_alimentacao_meia, "Sem Alimentação (Meia)"],
    com_int: [formData.qtd_com_alimentacao, "Completo (Inteira)"],
    com_meia: [formData.qtd_com_alimentacao_meia, "Completo (Meia)"],
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

    let ingressosRef = db.ref("COMIC2022");

    await ingressosRef
      .get(ingressosRef)
      .then(async (snapshot) => {
        let result = snapshot.val();
        let totalPedidos = result.pedidos;
        let totalIngressos = result.ingressos;

        const newPedidoID = totalPedidos + 1;
        const newPedidoName = `P${zeroFill(newPedidoID, 4)}`;

        var batch = store.batch();

        // envia dados gerais do pedido
        let pedidoRef = store.collection("COMIC2022").doc(newPedidoName);
        batch.set(pedidoRef, {
          id: newPedidoID,
          datetime: new Date(),
          status: "PENDENTE",
          total: data.total,
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          igreja: data.igreja,
          cidade: data.cidade,
          qtd_ingressos: {
            com_int: data.qtd_com_alimentacao,
            com_meia: data.qtd_com_alimentacao_meia,
            sem_int: data.qtd_sem_alimentacao,
            sem_meia: data.qtd_sem_alimentacao_meia,
          },
        });

        // envia dados dos ingressos
        let newIngressoID = totalIngressos;

        // Sem Alimentação (Meia)
        for (var i = 0; i < formData.qtd_sem_alimentacao_meia; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let ingressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            ingressoRef,
            getIngressosData(data, "sem_meia", i + 1, newIngressoID)
          );
        }
        // Sem Alimentação (Inteira)
        for (var i = 0; i < formData.qtd_sem_alimentacao; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let newIngressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            newIngressoRef,
            getIngressosData(data, "sem_int", i + 1, newIngressoID)
          );
        }
        // Completo (Meia)
        for (var i = 0; i < formData.qtd_com_alimentacao_meia; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let newIngressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            newIngressoRef,
            getIngressosData(data, "com_meia", i + 1, newIngressoID)
          );
        }
        // Completo (Inteira)
        for (var i = 0; i < formData.qtd_com_alimentacao; i++) {
          newIngressoID++;
          let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

          let newIngressoRef = pedidoRef
            .collection("INGRESSOS")
            .doc(newIngressoName);

          batch.set(
            newIngressoRef,
            getIngressosData(data, "com_int", i + 1, newIngressoID)
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
              .then(() => {
                // localStorage.removeItem("step4Data"); // TODO: uncomment this line to clear localStorage
                // sendNewOrderMail(data); // TODO: send email
                setSent(false);
                alert(
                  `ANOTE O NÚMERO DO SEU PEDIDO:\nPEDIDO ${newPedidoName}.\n\nAs instruções de pagamento serão enviadas para seu email em breve!`
                );
                // TODO: pagSeguro
              })
              .catch((error) => {
                console.error(error);
                setSent(false);
                alert("Erro no pedido! Tente novamente mais tarde!");
              });
          })
          .catch((error) => {
            console.log(error);
            setSent(false);
            alert("Erro no pedido! Tente novamente mais tarde!");
          });
      })
      .catch((error) => {
        console.error(error);
        setSent(false);
        alert("Erro no pedido! Tente novamente mais tarde!");
      });
  }

  return (
    <React.Fragment>
      <Navbar />
      <section className="py-3">
        <div className="container">
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} {...formDataProps} />}
          {step === 3 && <Step3 setStep={setStep} {...formDataProps} />}
          {step === 4 && (
            <Step4
              sent={sent}
              setSent={setSent}
              setStep={setStep}
              {...formDataProps}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

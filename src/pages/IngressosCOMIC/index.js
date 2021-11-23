import React, { useState, useEffect } from "react";
/*
import { useHistory } from "react-router-dom";

import { db, store } from "../services/firebase";
import { zeroFill } from "../services/numbers.service";
import { sendToSheet } from "../services/drive.service";
import { sendNewOrderMail } from "../services/mail.service";
*/
import Navbar from "../../components/Navbar";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

export default function IngressosCOMIC() {
  /*
  const history = useHistory();

  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [requestsCount, setRequestsCount] = useState(null);

  useEffect(() => {
    let requestsCountRef = db.ref("comic2021/ingressos");
    requestsCountRef.on("value", (snap) => {
      setRequestsCount(snap.val());
    });

    return () => requestsCountRef.off();
  }, []);

  function addToCount(place) {
    let requestsCountRef = db.ref("comic2021/ingressos");

    requestsCountRef
      .update({
        ...requestsCount,
        totalCount: requestsCount.totalCount + 1,
      })
      .catch((error) => console.log("Erro " + error));
  }

  function getDataForEmail(requestString) {
    const data = {
      ...form,
      id_string: requestString,
    };

    return data;
  }

  async function submitForm(event) {
    event.preventDefault();
    setSent(true);

    const requestId = requestsCount.totalCount + 1;
    const requestNumber = zeroFill(requestId, 4);
    const data = getDataForEmail(requestNumber);

    await store
      .collection("comic2021")
      .doc("ingressos")
      .collection(form.place)
      .doc("pedido" + requestNumber)
      .set({ ...form, id: requestId, datetime: new Date() })
      .then(() => {
        addToCount(form.place);
        sendToSheet({
          ...form,
          id: requestNumber,
          place: form.place.toUpperCase(),
        });
        sendNewOrderMail(data);
        alert(
          `ANOTE O NÚMERO DO SEU PEDIDO: Pedido ${requestNumber}.\nAs instruções de pagamento serão enviadas para seu email em breve!`
        );
        history.push("/comic");
      })
      .catch(() => {
        alert("Erro no pedido! Tente novamente mais tarde!");
      });
  }
  */

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    qtd_sem_alimentacao: 0,
    qtd_com_alimentacao: 0,
  });
  const formDataProps = {
    formData: formData,
    setFormData: setFormData,
  };

  const handleFormSubmit = (data) => alert(JSON.stringify(data, null, 2));

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <React.Fragment>
      <Navbar />
      <section className="py-4">
        <div className="container">
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} {...formDataProps} />}
          {step === 3 && <Step3 setStep={setStep} {...formDataProps} />}
          {step === 4 && (
            <Step4
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

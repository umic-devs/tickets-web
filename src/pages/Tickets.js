import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";

import { db, store } from "../services/firebase";
import { zeroFill } from "../services/numbers.service";
import { sendNewOrderMail } from "../services/mail.service";

import Navbar from "../components/Navbar";

const emptyForm = {
  name: "",
  place: "",
  email: "",
  cpf: "",
  phone: "",
  city: "",
  church: "",
  leader: "",
};

export default function Tickets() {
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
    const newPlaceCount =
      place === "bsb"
        ? { bsbCount: requestsCount.bsbCount + 1 }
        : place === "gyn"
        ? { gynCount: requestsCount.gynCount + 1 }
        : place === "go"
        ? { goCount: requestsCount.goCount + 1 }
        : null;

    requestsCountRef
      .update({
        ...requestsCount,
        ...newPlaceCount,
        totalCount: requestsCount.totalCount + 1,
      })
      .catch((error) => console.log("Erro " + error));
  }

  function isRequestsOver(place) {
    const response =
      place === "bsb"
        ? requestsCount?.bsbCount > 256
        : place === "gyn"
        ? requestsCount?.gynCount > 300
        : place === "go"
        ? requestsCount?.goCount > 300
        : null;

    return response;
  }

  function getDataForEmail(requestString) {
    const place =
      form.place === "bsb"
        ? "Brasília"
        : form.place === "gyn"
        ? "Goiânia"
        : form.place === "go"
        ? "Pires do Rio"
        : null;

    const data = {
      ...form,
      id_string: requestString,
      place: place,
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

  function isValid() {
    const validCpfRegex = RegExp(
      /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/g
    );
    const validEmailRegex = RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g
    );
    const validPhoneRegex = RegExp(/\([0-9]{2}\) [0-9]{5}-[0-9]{4}/g);

    return (
      validCpfRegex.test(form.cpf) &&
      validEmailRegex.test(form.email) &&
      validPhoneRegex.test(form.phone)
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9">
              <div className="text-center mb-2">
                <h1>Inscrição COMIC 2021</h1>
                <p>
                  <strong>LEIA COM ATENÇÃO AS INFORMAÇÕES ABAIXO:</strong>
                </p>
                <p>
                  Após pagamento, os valores não poderão ser reembolsados. Caso
                  o evento não possa ser realizado por motivo de força maior,
                  será marcado para data posterior.
                </p>
                <p>
                  No momento, os pedidos estão sendo realizados de forma
                  individual (um ingresso por pedido), devido à uma necessidade
                  de controle de pessoas que participarão do evento.
                </p>
                <p>
                  Após realizar o pedido, enviaremos um email com as instruções
                  de pagamento. No momento, as formas de pagamento disponíveis
                  são: Transferência bancária (TED, DOC ou PIX) e Depósito
                  bancário.
                </p>
                <p>
                  Pedidos sem pagamento poderão ser cancelados. O novo pedido
                  não garante sua vaga, ela só será garantida após a confirmação
                  de pagamento.
                </p>
              </div>
              <form onSubmit={submitForm}>
                <h2 className="text-center">Preencha os campos abaixo</h2>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome Completo"
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Local do COMIC</label>
                      <select
                        className="form-control"
                        value={form.place}
                        onChange={(e) =>
                          setForm({ ...form, place: e.target.value })
                        }
                        required
                      >
                        <option value="" disabled>
                          Escolha o local
                        </option>
                        <option value="bsb" disabled={isRequestsOver("bsb")}>
                          Brasília
                        </option>
                        <option value="gyn" disabled={isRequestsOver("gyn")}>
                          Goiânia
                        </option>
                        <option value="go" disabled={isRequestsOver("go")}>
                          Pires do Rio
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="exemplo@email.com"
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>CPF</label>
                      <InputMask
                        required
                        type="tel"
                        value={form.cpf}
                        mask="999.999.999-99"
                        className="form-control"
                        placeholder="___.___.___-__"
                        onChange={(e) =>
                          setForm({ ...form, cpf: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>WhatsApp</label>
                      <InputMask
                        required
                        type="tel"
                        value={form.phone}
                        mask="(99) 99999-9999"
                        className="form-control"
                        placeholder="(__) _____-____"
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        required
                        type="text"
                        value={form.city}
                        className="form-control"
                        placeholder="Cidade/Estado"
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Igreja</label>
                      <input
                        required
                        type="text"
                        value={form.church}
                        className="form-control"
                        placeholder="ex: Igreja de Cristo em Orizona"
                        onChange={(e) =>
                          setForm({ ...form, church: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Líder de Jovens</label>
                      <input
                        required
                        type="text"
                        value={form.leader}
                        className="form-control"
                        placeholder="Nome do(a) líder"
                        onChange={(e) =>
                          setForm({ ...form, leader: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    {sent ? (
                      <button className="btn btn-primary" disabled>
                        Pedido Enviado
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid()}
                      >
                        Finalizar Pedido
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

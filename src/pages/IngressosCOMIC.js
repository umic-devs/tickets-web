import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
/*
import { useHistory } from "react-router-dom";

import { db, store } from "../services/firebase";

import { zeroFill } from "../services/numbers.service";
import { sendToSheet } from "../services/drive.service";
import { sendNewOrderMail } from "../services/mail.service";
*/
import Navbar from "../components/Navbar";

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

  */

  /*

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [qtdComAlimentacao, setQtdComAlimentacao] = useState("");
  const [qtdSemAlimentacao, setQtdSemAlimentacao] = useState("");

  const onSubmit = (data) => console.log(data);
  function handleQtdSemAlimentacao(value) {
    if (value === "") {
      setQtdSemAlimentacao("");
      return "";
    } else if (value >= 0 && value <= 99) {
      setQtdSemAlimentacao(Number(value));
      return Number(value);
    }

    return qtdSemAlimentacao;
  }
  function handleQtdComAlimentacao(value) {
    if (value === "") {
      setQtdComAlimentacao("");
      return "";
    } else if (value >= 0 && value <= 99) {
      setQtdComAlimentacao(Number(value));
      return Number(value);
    }

    return qtdComAlimentacao;
  }

  function renderCamposIngressos(tipo) {
    let ingressos = [];
    const qtd = tipo === "sem" ? qtdSemAlimentacao : qtdComAlimentacao;
    console.log(qtd)
    for (let i = 1; i <= qtd; i++) {
      ingressos.push(
        <React.Fragment>
          <div className="col-12">
            <h6 className="mb-1">Ingresso {tipo === "sem" ? "Sem Alimentação" : "Completo"} {i}</h6>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                className="form-control"
                placeholder="Nome"
                {...register(`nome_${tipo}_${i}`, {
                  required: true,
                  minLength: 2,
                  maxLength: 26,
                })}
              />
              {errors[`nome_${tipo}_${i}`]?.type === "required" && (
                <small>Nome é obrigatório</small>
              )}
              {errors[`nome_${tipo}_${i}`]?.type === "minLength" && (
                <small>O nome deve ter pelo menos 2 caracteres</small>
              )}
              {errors[`nome_${tipo}_${i}`]?.type === "maxLength" && (
                <small>O nome deve ter menos que 26 caracteres</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sobrenome</label>
              <input
                className="form-control"
                placeholder="Sobrenome"
                {...register(`sobrenome_${tipo}_${i}`, {
                  required: true,
                  minLength: 2,
                  maxLength: 26,
                })}
              />
              {errors[`sobrenome_${tipo}_${i}`]?.type === "required" && (
                <small>Sobrenome é obrigatório</small>
              )}
              {errors[`sobrenome_${tipo}_${i}`]?.type === "minLength" && (
                <small>O sobrenome deve ter pelo menos 2 caracteres</small>
              )}
              {errors[`sobrenome_${tipo}_${i}`]?.type === "maxLength" && (
                <small>O sobrenome deve ter menos que 26 caracteres</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>CPF</label>
              <Controller
                name={`cpf_${tipo}_${i}`}
                control={control}
                rules={{
                  required: true,
                  pattern: /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/g,
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="tel"
                    className="form-control"
                    mask="999.999.999-99"
                    placeholder="___.___.___-__"
                  />
                )}
              />
              {errors[`cpf_${tipo}_${i}`]?.type === "required" && (
                <small>CPF é obrigatório</small>
              )}
              {errors[`cpf_${tipo}_${i}`]?.type === "pattern" && <small>CPF inválido</small>}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>WhatsApp (Telefone)</label>
              <Controller
                name={`telefone_${tipo}_${i}`}
                control={control}
                rules={{
                  required: true,
                  pattern: /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/g,
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="tel"
                    className="form-control"
                    mask="(99) 99999-9999"
                    placeholder="(__) _____-____"
                  />
                )}
              />
              {errors[`telefone_${tipo}_${i}`]?.type === "required" && (
                <small>Telefone é obrigatório</small>
              )}
              {errors[`telefone_${tipo}_${i}`]?.type === "pattern" && (
                <small>Telefone inválido</small>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
    return ingressos;
  }

  return (
    <React.Fragment>
      <Navbar />
      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9">
              <div className="mb-2">
                <h1>Inscrição COMIC 2022</h1>
                <h4>Preencha os campos abaixo</h4>
                <p>
                  <strong>LEIA COM ATENÇÃO AS INFORMAÇÕES ABAIXO:</strong>
                </p>
                <p>Após pagamento, os valores não poderão ser reembolsados.</p>
                <p>
                  Após realizar o pedido, enviaremos um email de confirmação com
                  os dados do seu ingresso. No dia do evento, seus ingressos
                  estarão esperando por você na bilheteria do evento. Traga um
                  documento de identidade com foto e o email de confirmação para
                  a retirada dos ingressos.
                </p>
                <p>
                  Apenas a pessoa que fez o pedido poderá retirar os ingressos
                  na bilheteria do evento. Em nenhuma hipótese os ingressos
                  serão entregues a terceiros.
                </p>
                <p>
                  A opção de ingresso com alimentação só poderá ser adquirido
                  até o dia 5 de Fevereiro. Não será vendido alimentação no dia
                  do evento.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Primeira etapa */}
                <h4 className="mb-1">Ingressos</h4>
                <h6 className="mb-3">
                  Selecione quantos ingressos de cada tipo deseja pedir
                </h6>
                <div className="row">
                  <div className="col-12 d-flex flex-row justify-content-between align-items-center">
                    <div className="form-group mb-0">
                      <p className="mb-0">
                        <strong>INGRESSO SEM ALIMENTAÇÃO</strong>
                      </p>
                      <small className="mb-1">
                        <i>Entrada + hospedagem em escola</i>
                      </small>
                      <p>
                        <strong>
                          R$ 130,00 <i>(até dia 10 de Janeiro de 2022)</i>
                        </strong>
                      </p>
                    </div>
                    <div className="form-group w-25">
                      <Controller
                        name="qtd_sem_alimentacao"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            className="form-control form-control-lg"
                            placeholder="Quantidade"
                            value={qtdSemAlimentacao}
                            onChange={(e) => {
                              field.onChange(
                                handleQtdSemAlimentacao(e.target.value)
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex flex-row justify-content-between align-items-center">
                    <div className="form-group mb-0">
                      <p className="mb-0">
                        <strong>INGRESSO COM ALIMENTAÇÃO</strong>
                      </p>
                      <small className="mb-1">
                        <i>Entrada + hospedagem em escola + alimentação</i>
                      </small>
                      <p>
                        <strong>
                          R$ 290,00 <i>(até dia 10 de Janeiro de 2022)</i>
                        </strong>
                      </p>
                    </div>
                    <div className="form-group w-25">
                      <Controller
                        name="qtd_com_alimentacao"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            className="form-control form-control-lg"
                            placeholder="Quantidade"
                            value={qtdComAlimentacao}
                            onChange={(e) => {
                              field.onChange(
                                handleQtdComAlimentacao(e.target.value)
                              );
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* Segunda etapa */}
                <h4>Dados de quem irá retirar o(s) ingresso(s)</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        className="form-control"
                        placeholder="Nome"
                        {...register("nome", {
                          required: true,
                          minLength: 2,
                          maxLength: 26,
                        })}
                      />
                      {errors.nome?.type === "required" && (
                        <small>Nome é obrigatório</small>
                      )}
                      {errors.nome?.type === "minLength" && (
                        <small>O nome deve ter pelo menos 2 caracteres</small>
                      )}
                      {errors.nome?.type === "maxLength" && (
                        <small>O nome deve ter menos que 26 caracteres</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Sobrenome</label>
                      <input
                        className="form-control"
                        placeholder="Sobrenome"
                        {...register("sobrenome", {
                          required: true,
                          minLength: 2,
                          maxLength: 26,
                        })}
                      />
                      {errors.sobrenome?.type === "required" && (
                        <small>Sobrenome é obrigatório</small>
                      )}
                      {errors.sobrenome?.type === "minLength" && (
                        <small>
                          O sobrenome deve ter pelo menos 2 caracteres
                        </small>
                      )}
                      {errors.sobrenome?.type === "maxLength" && (
                        <small>
                          O sobrenome deve ter menos que 26 caracteres
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>CPF</label>
                      <Controller
                        name="cpf"
                        control={control}
                        rules={{
                          required: true,
                          pattern:
                            /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/g,
                        }}
                        render={({ field }) => (
                          <InputMask
                            {...field}
                            type="tel"
                            className="form-control"
                            mask="999.999.999-99"
                            placeholder="___.___.___-__"
                          />
                        )}
                      />
                      {errors.cpf?.type === "required" && (
                        <small>CPF é obrigatório</small>
                      )}
                      {errors.cpf?.type === "pattern" && (
                        <small>CPF inválido</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>WhatsApp (Telefone)</label>
                      <Controller
                        name="telefone"
                        control={control}
                        rules={{
                          required: true,
                          pattern: /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/g,
                        }}
                        render={({ field }) => (
                          <InputMask
                            {...field}
                            type="tel"
                            className="form-control"
                            mask="(99) 99999-9999"
                            placeholder="(__) _____-____"
                          />
                        )}
                      />
                      {errors.telefone?.type === "required" && (
                        <small>Telefone é obrigatório</small>
                      )}
                      {errors.telefone?.type === "pattern" && (
                        <small>Telefone inválido</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="exemplo@email.com"
                        {...register("email", {
                          required: true,
                          pattern:
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g,
                        })}
                      />
                      {errors.email?.type === "required" && (
                        <small>Email é obrigatório</small>
                      )}
                      {errors.email?.type === "pattern" && (
                        <small>O email deve estar no formato correto</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Confirmar Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="exemplo@email.com"
                        {...register("email_confirmacao", {
                          required: true,
                          pattern:
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g,
                          validate: {
                            match: (value) => watch("email") === value,
                          },
                        })}
                      />
                      {errors.email_confirmacao?.type === "required" && (
                        <small>Email é obrigatório</small>
                      )}
                      {errors.email_confirmacao?.type === "pattern" && (
                        <small>O email deve estar no formato correto</small>
                      )}
                      {errors.email_confirmacao?.type === "match" && (
                        <small>Os emails não são iguais</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Nome da Igreja</label>
                      <input
                        className="form-control"
                        placeholder="Ex: Igreja de Cristo em Brasília"
                        {...register("igreja", {
                          required: true,
                          minLength: 2,
                          maxLength: 50,
                          validate: {
                            igreja_de_cristo: (value) =>
                              "igreja de cristo" !== value.toLowerCase(),
                          },
                        })}
                      />
                      {errors.igreja?.type === "required" && (
                        <small>Nome da igreja é obrigatório</small>
                      )}
                      {errors.igreja?.type === "minLength" && (
                        <small>
                          O nome da igreja deve ter pelo menos 2 caracteres
                        </small>
                      )}
                      {errors.igreja?.type === "maxLength" && (
                        <small>
                          O nome da igreja deve ter menos que 50 caracteres
                        </small>
                      )}
                      {errors.igreja?.type === "igreja_de_cristo" && (
                        <small>Qual Igreja de Cristo, abençoado(a)?</small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label>Cidade/Estado</label>
                      <input
                        className="form-control"
                        placeholder="Ex: Morrinhos/GO"
                        {...register("cidade", {
                          required: true,
                          minLength: 2,
                          maxLength: 50,
                        })}
                      />
                      {errors.cidade?.type === "required" && (
                        <small>Cidade é obrigatório</small>
                      )}
                      {errors.cidade?.type === "minLength" && (
                        <small>Cidade deve ter pelo menos 2 caracteres</small>
                      )}
                      {errors.cidade?.type === "maxLength" && (
                        <small>Cidade deve ter menos que 50 caracteres</small>
                      )}
                    </div>
                  </div>
                  {/* Terceira etapa */}
                  <h4>Dados de cada ingresso</h4>
                  <div className="row">
                    {renderCamposIngressos('sem')}
                    {renderCamposIngressos('com')}
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Finalizar Pedido
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

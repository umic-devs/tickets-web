import React from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";

export default function Step3({ setStep, formData, setFormData }) {
  const {
    watch,
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const step3Data = JSON.parse(localStorage.getItem("step3Data") || "{}");

  const onSubmit = (data) => {
    const newFormData = { ...formData, ...data };
    localStorage.setItem("step3Data", JSON.stringify(newFormData));
    setFormData(newFormData);
    setStep(4);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <h2>Inscrição COMIC 2022</h2>
                  <h4>Dados de quem irá retirar o pedido</h4>
                  <p>
                    <strong>
                      Preencha os campos abaixo com as informações pessoais de
                      quem irá retirar o(s) ingresso(s)
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    className="form-control"
                    placeholder="Nome"
                    defaultValue={step3Data.nome || ""}
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
                    defaultValue={step3Data.sobrenome || ""}
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
                    <small>O sobrenome deve ter pelo menos 2 caracteres</small>
                  )}
                  {errors.sobrenome?.type === "maxLength" && (
                    <small>O sobrenome deve ter menos que 26 caracteres</small>
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
                    defaultValue={step3Data.email || ""}
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g,
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
                    defaultValue={step3Data.email_confirmacao || ""}
                    {...register("email_confirmacao", {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g,
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
                  <label>CPF</label>
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue={step3Data.cpf || ""}
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
                    defaultValue={step3Data.telefone || ""}
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
                  <label>Nome da Igreja</label>
                  <input
                    className="form-control"
                    placeholder="Ex: Igreja de Cristo em Brasília"
                    defaultValue={step3Data.igreja || ""}
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
                    defaultValue={step3Data.cidade || ""}
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
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-4 col-md-4">
                <button
                  className="btn px-0 text-primary"
                  onClick={() => setStep(2)}
                >
                  {"<-"} Voltar
                </button>
              </div>
              <div className="col-8 col-md-4 text-right">
                <button type="submit" className="btn btn-primary btn-block">
                  Continuar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

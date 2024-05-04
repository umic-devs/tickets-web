import React, { useContext } from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form"

import { db, store } from "services/firebase";
import { zeroFill } from "utils/string";

import { TicketsContext } from "context/tickets";
import { getDataToFirebase } from "services/data.service";
import { createPreference } from "services/mercadopago.service";

export default function TicketsForm() {
    const { buyerData, nextStep, loading, setLoading } = useContext(TicketsContext);
    const { watch, control, register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        const order = getDataToFirebase(data);
        console.log(data)

        let ticketNumber = undefined;

        try {
            let ingressosRef = db.ref("CL24");

            await ingressosRef.get()
                .then(async (snapshot) => {
                    let result = snapshot.val();

                    let totalIngressos = result.ingressos;
                    console.log(totalIngressos)

                    const newIngressoID = totalIngressos + 1;
                    const newIngressoName = `I${zeroFill(newIngressoID, 4)}`;
                    ticketNumber = newIngressoName;

                    var batch = store.batch();

                    // ORDER
                    let ticketRef = store.collection("CL24").doc(ticketNumber);
                    batch.set(ticketRef, {
                        ...order,
                        id: newIngressoName,
                        datetime: new Date(),
                    });

                    await ingressosRef
                        .update({
                            ingressos: newIngressoID,
                        })
                        .then(async () => await batch.commit())
                })

            const res_mercadopago = await createPreference(
                ticketNumber,
                data.email,
                data.telefone,
            );

            window.open(res_mercadopago.data.init_point, '_blank', 'noreferrer')

            localStorage.setItem("pedido", ticketNumber);
            localStorage.setItem("link", res_mercadopago.data.init_point);

            nextStep()

        } catch (error) {
            console.log(error);
            alert("Houve um erro, tente novamente mais tarde!")
        }

        setLoading(false);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-9">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-1">
                                <label className="mb-0">Nome *</label>
                                <input
                                    className="form-control"
                                    placeholder="Nome"
                                    defaultValue={""}
                                    {...register(`nome`, {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 26,
                                    })}
                                />
                                {errors[`nome`]?.type === "required" && (
                                    <small>Nome é obrigatório</small>
                                )}
                                {errors[`nome`]?.type === "minLength" && (
                                    <small>O nome deve ter pelo menos 2 caracteres</small>
                                )}
                                {errors[`nome`]?.type === "maxLength" && (
                                    <small>O nome deve ter menos que 26 caracteres</small>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-1">
                                <label className="mb-0">Sobrenome *</label>
                                <input
                                    className="form-control"
                                    placeholder="Sobrenome"
                                    defaultValue={""}
                                    {...register(`sobrenome`, {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 26,
                                    })}
                                />
                                {errors[`sobrenome`]?.type === "required" && (
                                    <small>Sobrenome é obrigatório</small>
                                )}
                                {errors[`sobrenome`]?.type === "minLength" && (
                                    <small>O sobrenome deve ter pelo menos 2 caracteres</small>
                                )}
                                {errors[`sobrenome`]?.type === "maxLength" && (
                                    <small>O sobrenome deve ter menos que 26 caracteres</small>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-1">
                                <label className="mb-0">WhatsApp *</label>
                                <Controller
                                    name={`telefone`}
                                    control={control}
                                    defaultValue={""}
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
                                {errors[`telefone`]?.type === "required" && (
                                    <small>Telefone é obrigatório</small>
                                )}
                                {errors[`telefone`]?.type === "pattern" && (
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
                                    defaultValue={buyerData.email || ""}
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
                                    defaultValue={buyerData.email_confirmacao || ""}
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
                                    defaultValue={buyerData.cpf || ""}
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
                                <label>Nome da Igreja</label>
                                <input
                                    className="form-control"
                                    placeholder="Ex: Igreja de Cristo em Brasília"
                                    defaultValue={buyerData.igreja || ""}
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
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Cidade/Estado</label>
                                <input
                                    className="form-control"
                                    placeholder="Ex: Morrinhos/GO"
                                    defaultValue={buyerData.cidade || ""}
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
                        <div className="col-12 text-right">
                            {loading ? (
                                <button className="btn btn-primary btn-block" disabled>
                                    <span className="spinner-border spinner-border-sm" />
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary btn-block">
                                    Continuar
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
}

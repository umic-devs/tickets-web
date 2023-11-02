import React, { useContext } from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form"

import { db, store } from "services/firebase";
import { zeroFill } from "utils/string";

import { getTicketDataById } from "consts/ticketOptions";
import { TicketsContext } from "context/tickets";
import { getDataToFirebase } from "services/data.service";
import { createPreference } from "services/mercadopago.service";
import { Redirect } from "react-router-dom";

export default function TicketsForm() {
    const { selectedTickets, previousStep, buyerData, totalPrice, nextStep, loading, setLoading } = useContext(TicketsContext);
    const { control, register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        const { order, tickets } = getDataToFirebase(data, selectedTickets, buyerData, totalPrice);

        let orderNumber = undefined;

        try {
            let ingressosRef = db.ref("COMIC24");

            await ingressosRef
                .get(ingressosRef)
                .then(async (snapshot) => {
                    let result = snapshot.val();

                    let totalPedidos = result.pedidos;
                    let totalIngressos = result.ingressos;

                    const newPedidoID = totalPedidos + 1;
                    const newPedidoName = `P${zeroFill(newPedidoID, 4)}`;
                    orderNumber = newPedidoName;

                    var batch = store.batch();

                    // ORDER
                    let pedidoRef = store.collection("COMIC24").doc(newPedidoName);
                    batch.set(pedidoRef, {
                        ...order,
                        id: newPedidoName,
                        datetime: new Date(),
                    });

                    // TICKETS
                    let newIngressoID = totalIngressos;

                    for (var i = 0; i < tickets.length; i++) {
                        newIngressoID++;
                        let newIngressoName = `I${zeroFill(newIngressoID, 4)}`;

                        let newIngressoRef = pedidoRef
                            .collection("INGRESSOS")
                            .doc(newIngressoName);

                        batch.set(newIngressoRef, {
                            ...tickets[i],
                            id: newIngressoName,
                            order_id: newPedidoName,
                        });
                    }

                    await ingressosRef
                        .update({
                            pedidos: newPedidoID,
                            ingressos: newIngressoID,
                        })
                        .then(async () => await batch.commit())
                })

            const res_mercadopago = await createPreference(
                orderNumber,
                buyerData.email,
                buyerData.telefone,
                selectedTickets['normal'],
                selectedTickets['child']
            );

            window.go(res_mercadopago.data.sandbox_init_point);

        } catch (error) {
            console.log(error);
            alert("Houve um erro, tente novamente mais tarde!")
        }

        setLoading(false);
    };

    const renderTicketsForm = () => Object.keys(selectedTickets).map(type => Array(selectedTickets[type]).fill(1).map((_, index) => (
        <>
            <div className="col-12 mt-2">
                <h5>{getTicketDataById(type).name} #{index + 1}</h5>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group mb-1">
                    <label className="mb-0">Nome *</label>
                    <input
                        className="form-control"
                        placeholder="Nome"
                        defaultValue={""}
                        {...register(`nome_${type}_${index}`, {
                            required: true,
                            minLength: 2,
                            maxLength: 26,
                        })}
                    />
                    {errors[`nome_${type}_${index}`]?.type === "required" && (
                        <small>Nome é obrigatório</small>
                    )}
                    {errors[`nome_${type}_${index}`]?.type === "minLength" && (
                        <small>O nome deve ter pelo menos 2 caracteres</small>
                    )}
                    {errors[`nome_${type}_${index}`]?.type === "maxLength" && (
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
                        {...register(`sobrenome_${type}_${index}`, {
                            required: true,
                            minLength: 2,
                            maxLength: 26,
                        })}
                    />
                    {errors[`sobrenome_${type}_${index}`]?.type === "required" && (
                        <small>Sobrenome é obrigatório</small>
                    )}
                    {errors[`sobrenome_${type}_${index}`]?.type === "minLength" && (
                        <small>O sobrenome deve ter pelo menos 2 caracteres</small>
                    )}
                    {errors[`sobrenome_${type}_${index}`]?.type === "maxLength" && (
                        <small>O sobrenome deve ter menos que 26 caracteres</small>
                    )}
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group mb-1">
                    <label className="mb-0">WhatsApp *</label>
                    <Controller
                        name={`telefone_${type}_${index}`}
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
                    {errors[`telefone_${type}_${index}`]?.type === "required" && (
                        <small>Telefone é obrigatório</small>
                    )}
                    {errors[`telefone_${type}_${index}`]?.type === "pattern" && (
                        <small>Telefone inválido</small>
                    )}
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-group mb-1">
                    <label className="mb-0">Sexo</label>
                    <Controller
                        name={`sexo_${type}_${index}`}
                        control={control}
                        defaultValue={""}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <select {...field} className="form-control">
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        )}
                    />
                    {errors[`sexo_${type}_${index}`]?.type === "required" && (
                        <small>Campo obrigatório</small>
                    )}
                </div>
            </div>
        </>
    )));

    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <div className="col-12 col-md-9">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mb-3">
                            {renderTicketsForm()}
                        </div>
                        <div className="row justify-content-between align-items-center">
                            <div className="col-4 col-md-3">
                                <button
                                    className="btn px-0 text-primary"
                                    onClick={() => previousStep()}
                                >
                                    {"<-"} Voltar
                                </button>
                            </div>
                            <div className="col-8 col-md-4 text-right">
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
                </div>
            </div>
        </React.Fragment>
    );
}

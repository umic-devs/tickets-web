import React, { useEffect, useState } from "react";
import {
  MdCheck,
  MdClose,
  MdOutlineMarkEmailRead,
  MdContentCopy,
} from "react-icons/md";
import { store } from "../../services/firebase";
import { zeroFill } from "../../services/numbers.service";

const Tickets = () => {
  const [data, setData] = useState([]);

  async function getPedidosFromFirebase(data) {
    const pedidos = store.collection("COMIC2022");

    let newData = [];
    await pedidos.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("asjdhas");
        newData.push(doc.data());
      });
    });

    setData(newData);
  }

  useEffect(() => {
    getPedidosFromFirebase();
  }, []);

  async function updateStatusPedido(itemId, status) {
    const pedidoId = `P${zeroFill(itemId, 4)}`;
    const pedidos = store.collection("COMIC2022");

    await pedidos
      .doc(pedidoId)
      .update({
        status: status,
      })
      .then(() => {
        const pedidoIndex = data.findIndex((item) => item.id === itemId);
        data[pedidoIndex].status = status;
        setData([...data]);
      })
      .catch(() => alert("Erro ao atualizar status!"));
  }

  const getColorFromStatus = (status) => {
    switch (status) {
      case "PENDENTE":
        return "orange";
      case "COBRANÇA PENDENTE":
        return "blue";
      case "CONCLUÍDO":
        return "green";
      case "CANCELADO":
        return "red";
      default:
        return "white";
    }
  };

  const getActionsFromStatus = (item) => {
    switch (item.status) {
      case "PENDENTE":
        return (
          <>
            <button className="btn" onClick={() => copyDataToClipboard(item)}>
              <MdContentCopy />
            </button>
            <button
              className="btn"
              onClick={() => updateStatusPedido(item.id, "CONCLUÍDO")}
            >
              <MdCheck />
            </button>
            <button
              className="btn"
              onClick={() => updateStatusPedido(item.id, "CANCELADO")}
            >
              <MdClose />
            </button>
          </>
        );
      case "COBRANÇA PENDENTE":
        return (
          <>
            <button className="btn" onClick={() => copyDataToClipboard(item)}>
              <MdContentCopy />
            </button>
            <button
              className="btn"
              onClick={() => updateStatusPedido(item.id, "PENDENTE")}
            >
              <MdOutlineMarkEmailRead />
            </button>
            <button
              className="btn"
              onClick={() => updateStatusPedido(item.id, "CANCELADO")}
            >
              <MdClose />
            </button>
          </>
        );
      default:
        return <></>;
    }
  };

  const copyDataToClipboard = (item) => {
    const data = JSON.stringify({
      id_string: `P${zeroFill(item.id, 4)}`,
      name: item.nome,
      email: item.email,
      phone: item.telefone,
      cpf: item.cpf,
      city: item.cidade,
      church: item.igreja,
    });
    console.log(data);
    navigator.clipboard.writeText(data);
  };

  const getList = () => {
    return data.map((item, index) => {
      const pedidoId = `P${zeroFill(item.id, 4)}`;
      return (
        <tr
          key={index}
          style={{
            backgroundColor: getColorFromStatus(item.status),
          }}
        >
          <td>{pedidoId}</td>
          <td>{item.nome}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>{item.igreja}</td>
          <td>{item.cidade}</td>
          <td>
            {item.total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </td>
          <td>{item.forma_pagamento}</td>
          <td>{item.status}</td>
          <td>{getActionsFromStatus(item)}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Igreja</th>
            <th>Cidade</th>
            <th>Total</th>
            <th>Pagamento</th>
            <th>Status</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>{getList()}</tbody>
      </table>
      {data.forEach((item) => {
        return item.id;
      })}
    </div>
  );
};

export default Tickets;

import React, { useEffect, useState } from "react";
import { store } from "../../services/firebase";
import { zeroFill } from "../../services/numbers.service";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [showCancelled, setShowCancelled] = useState(false);

  async function getPedidosFromFirebase(data) {
    const pedidos = store.collection("COMIC2022");

    let newData = [];
    await pedidos.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        newData.push(doc.data());
      });
    });

    setData(newData);
  }

  useEffect(() => {
    getPedidosFromFirebase();
  }, []);

  const getColorFromStatus = (status) => {
    switch (status) {
      case "PENDENTE":
        return "orange";
      case "PAGO":
        return "green";
      case "CANCELADO":
        return "red";
      default:
        return "white";
    }
  };

  const copyDataToClipboard = (
    id_string,
    name,
    email,
    phone,
    cpf,
    city,
    church
  ) => {
    const data = JSON.stringify({
      id_string: `P${zeroFill(id_string, 4)}`,
      name: name,
      email: email,
      phone: phone,
      cpf: cpf,
      city: city,
      church: church,
    });
    console.log(data);
    navigator.clipboard.writeText(data);
  };

  const getList = () => {
    return data.map((item, index) => {
      if (item.status !== "CANCELADO"){
      return (
        <tr
          key={index}
          style={{
            backgroundColor: getColorFromStatus(item.status),
          }}
        >
          <td>{`P${zeroFill(item.id, 4)}`}</td>
          <td>{item.nome}</td>
          <td>{item.sobrenome}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>{item.igreja}</td>
          <td>{item.cidade}</td>
          <td>{item.total}</td>
          <td>{item.forma_pagamento}</td>
          <td>{item.status}</td>
          <td>
            <button
              onClick={() =>
                copyDataToClipboard(
                  item.id,
                  item.nome,
                  item.email,
                  item.telefone,
                  item.cpf,
                  item.cidade,
                  item.igreja
                )
              }
            >
              Copiar
            </button>
          </td>
        </tr>
      );
      }
    });
  };

  return (
    <div>
      <div>
        <label>
          Mostrar cancelados
          <input
            name="showCancelled"
            type="checkbox"
            checked={showCancelled}
            onChange={() => setShowCancelled(!showCancelled)}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Nome</th>
            <th>Sobrenome</th>
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

export default Dashboard;

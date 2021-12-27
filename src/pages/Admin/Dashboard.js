import React, { useEffect, useState } from "react";
import { db, store } from "../../services/firebase";

const Dashboard = () => {
  const [data, setData] = useState([]);

  async function getPedidosFromFirebase(data) {
    const pedidos = store.collection("COMIC2022");

    let newData = [];
    await pedidos.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
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

  const getList = () => {
    return data.map((item, index) => {
      return (
        <tr
          key={index}
          style={{
            backgroundColor: getColorFromStatus(item.status),
          }}
        >
          <td>{item.id}</td>
          <td>{item.nome}</td>
          <td>{item.sobrenome}</td>
          <td>{item.email}</td>
          <td>{item.telefone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Total</th>
            <th>Status</th>
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

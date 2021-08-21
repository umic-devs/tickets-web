import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="home" />
      <section className="bg-conference text-light py-0">
        <div className="container">
          <div className="row min-vh-60 align-items-center">
            <div className="col-8">
              <h5 className="mb-0">30 e 31 de Outubro, 2021</h5>
              <h1 className="display-1 mb-0">reconectar</h1>
              <h2 className="mb-3">Conferência de Líderes</h2>
              <h5 className="mb-0">Chácara Shalom, Goianira, Goiás</h5>
              <a className="btn btn-lg btn-conference mt-5 disabled" href="/conferencia-lideres">Ingressos em breve</a>
              {/* <a className="btn btn-lg btn-conference mt-5" href="/conferencia-lideres">Garantir Ingresso</a> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row text-light">
            <div className="col-md-8">
              <h2>Dois dias de imersão na Palavra e orientações entre líderes.</h2>
              <p className="lead text-light">Os encontros entre líderes de jovens ganharam nova estrutura. O nosso objetivo é conseguir expandir a unidade e comunhão entre os líderes e fortalecê-los. Compartilhar desafios e acertos no ministério. Pedimos que cada líder pense também em jovens líderes que podem se preparar para participar. Serão dias intensos e de muita importância para o Reino.</p>
              <p className="lead text-light mb-0">Em breve, as inscrições serão abertas. Fique ligado!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

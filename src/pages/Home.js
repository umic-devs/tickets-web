import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import confBanner from '../assets/images/conference/conference-banner.png'

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="home" />
      <section className="bg-light">
        <div className="container">
          <div className="carousel-home" href="/">
            <div className="form-row">
              <div className="col-8">
                <div
                  className="carousel-img"
                  style={{ backgroundImage: `url(${confBanner})` }}
                />
              </div>
              <div className="col-4">
                <div className="carousel-text-container d-flex flex-column">
                  <p className="carousel-date">30 e 31 de Outubro, 2021</p>
                  <h1 className="carousel-title">reconectar</h1>
                  <h1 className="carousel-categ">Conferência de Líderes</h1>
                  <p className="carousel-place">
                    Chácara Shalom, Goianira, Goiás
                  </p>
                  <a
                    className="btn btn-conference mt-auto"
                    href="/conferencia-lideres"
                  >
                    Saiba mais -&gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-dark">
        <div className="container">
          <div className="row text-light mb-2">
            <div className="col">
              <h2>Sobre a UMIC</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 d-flex">
              <div className="card card-body">
                <div className="flex-grow-1">
                  <h3>Missão</h3>
                  <span>
                    Desenvolver a unidade entre os jovens das Igrejas de Cristo
                    no Brasil.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex">
              <div className="card card-body">
                <div className="flex-grow-1">
                  <h3>Visão</h3>
                  <span>
                    Promover a edificação de jovens e equipá-los para o
                    ministério, compartilhando o Evangelho de Cristo.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex">
              <div className="card card-body">
                <div className="flex-grow-1">
                  <h3>Valores</h3>
                  <span>
                    Unidade, Excelência, Perseverança, Aliança, Serviço,
                    Evangelho.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer className="bg-dark-blue text-light" />
    </div>
  )
}

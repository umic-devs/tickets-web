import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDidMountEffect } from "../helpers";

export default function AttendeeForm({ product, onChange, index }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  useDidMountEffect(() => {
    onChange({
      name, phoneNumber, email, index 
    })
  }, [name, phoneNumber, email]);


  return (
    <>
      <h4>{product.title} </h4>

      <div className="row mb-4">
        <div className="col-12 col-md-12">
          <div className="form-group mb-1">
            <label className="mb-0">Nome *</label>
            <input
              className="form-control"
              placeholder="Nome completo"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-group mb-1">
            <label className="mb-0">WhatsApp *</label>
            <input
              className="form-control"
              placeholder="WhatsApp"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-group mb-1">
            <label className="mb-0">Email</label>
            <input
              type={`email_${product.type}`}
              className="form-control"
              placeholder="exemplo@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

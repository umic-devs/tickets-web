import React, {useContext, useState} from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { AttendeeForm } from "../../components";
import { CartContext } from "../../App";
import { useDidMountEffect } from "../../helpers";

export default function TicketsAtendeesPage({
  sent,
  setStep,
  formData,
  setFormData,
  handleFormSubmit,
}) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { cart, updateCart } = useContext(CartContext);

  const [attendees, setAttendees] = useState([])

  useDidMountEffect(() => {
    console.log(attendees);
  }, [attendees]);

  const atendeesData = JSON.parse(localStorage.getItem("atendeesData") || "{}");

  const onSubmit = (data) => {
    // const newFormData = { ...formData, ...data };
    // localStorage.setItem("atendeesData", JSON.stringify(newFormData));
    // setFormData(newFormData);
    // handleFormSubmit(newFormData);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div>
                  <h2>Inscrição COMIC 2022</h2>
                  <h4>Dados de cada ingresso</h4>
                  <p className="mb-1">
                    <strong>
                      Preencha os campos abaixo com as informações de quem
                      receberá cada ingresso.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="row mb-3">

              {cart.map((item, index) => (
                <div key={index}>
                  {Array.from({ length: item.amount }).map((j, i) => (
                    <AttendeeForm
                      key={i}
                      index={i}
                      product={item.product}
                      onChange={(attendee) => 
                        setAttendees(composeAttendees(attendees, attendee))
                      }
                    />
                  ))}
                </div>
                // return <AttendeeForm key={index} product={item.product} />
              ))}

            </div>

            <div className="row justify-content-between align-items-center">
              <div className="col-4 col-md-3">
                <button
                  className="btn px-0 text-primary"
                  onClick={() => setStep(3)}
                >
                  {"<-"} Voltar
                </button>
              </div>
              <div className="col-8 col-md-4 text-right">
                {sent ? (
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

const composeAttendees = (attendees, attendee) => {
  const nextAttendees = attendees.filter(
    (nextAttendee) => nextAttendee.index !== attendee.index
  );

  return [attendee, ...nextAttendees];
};

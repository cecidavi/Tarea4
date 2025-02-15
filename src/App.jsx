import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faUser, faPhone, faBed, faTint, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const HotelRegistration = () => {
  const [formData, setFormData] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    habitacion: "",
    rh: "",
    fecha_ingreso: "",
    fecha_salida: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.identificacion.trim() || !/^\d{5,}$/.test(formData.identificacion)) {
      newErrors.identificacion = "La identificación debe tener al menos 5 dígitos.";
    }

    if (!formData.nombres.trim()) {
      newErrors.nombres = "El nombre es obligatorio.";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "El apellido es obligatorio.";
    }

    if (!formData.telefono.trim() || !/^\d{7,}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }

    if (!formData.habitacion.trim()) {
      newErrors.habitacion = "El número de habitación es obligatorio.";
    }

    if (!formData.rh.trim()) {
      newErrors.rh = "El RH es obligatorio.";
    }

    if (!formData.fecha_ingreso) {
      newErrors.fecha_ingreso = "La fecha de ingreso es obligatoria.";
    }

    if (!formData.fecha_salida) {
      newErrors.fecha_salida = "La fecha de salida es obligatoria.";
    } else if (formData.fecha_ingreso && formData.fecha_salida < formData.fecha_ingreso) {
      newErrors.fecha_salida = "La fecha de salida no puede ser anterior a la de ingreso.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Swal.fire("Registro Exitoso", "El huésped ha sido registrado.", "success");
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      identificacion: "",
      nombres: "",
      apellidos: "",
      telefono: "",
      habitacion: "",
      rh: "",
      fecha_ingreso: "",
      fecha_salida: "",
    });
    setErrors({});
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Registro de Huésped</h1>
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg p-4 rounded-3" style={{ width: "35rem" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {[
                { name: "identificacion", icon: faIdCard, label: "Identificación" },
                { name: "nombres", icon: faUser, label: "Nombres" },
                { name: "apellidos", icon: faUser, label: "Apellidos" },
                { name: "telefono", icon: faPhone, label: "Teléfono", type: "tel" },
                { name: "habitacion", icon: faBed, label: "Habitación" },
                { name: "rh", icon: faTint, label: "RH" },
              ].map(({ name, icon, label, type = "text" }) => (
                <div className="mb-3" key={name}>
                  <label htmlFor={name} className="form-label">{label}</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <input
                      type={type}
                      className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                    {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                  </div>
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="fecha_ingreso" className="form-label">Fecha de ingreso</label>
                <input
                  type="date"
                  className={`form-control ${errors.fecha_ingreso ? "is-invalid" : ""}`}
                  id="fecha_ingreso"
                  name="fecha_ingreso"
                  value={formData.fecha_ingreso}
                  onChange={handleChange}
                />
                {errors.fecha_ingreso && <div className="invalid-feedback">{errors.fecha_ingreso}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="fecha_salida" className="form-label">Fecha de salida</label>
                <input
                  type="date"
                  className={`form-control ${errors.fecha_salida ? "is-invalid" : ""}`}
                  id="fecha_salida"
                  name="fecha_salida"
                  value={formData.fecha_salida}
                  onChange={handleChange}
                />
                {errors.fecha_salida && <div className="invalid-feedback">{errors.fecha_salida}</div>}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success me-2">
                  <FontAwesomeIcon icon={faCheck} /> Registrar
                </button>
                <button type="button" className="btn btn-danger" onClick={handleReset}>
                  <FontAwesomeIcon icon={faTimes} /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <HotelRegistration />
    </div>
  );
};

export default App;

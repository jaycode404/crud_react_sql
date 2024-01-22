import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  edad: "",
  pais: "",
  puesto: "",
};

const deployUrl = import.meta.env.VITE_URL;
const url = deployUrl;

function App() {
  console.log(url);
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState(initialForm);

  //GET
  const getEmpleados = async () => {
    try {
      const response = await fetch(`${url}/empleados`, {
        mode: 'no-cors',
      });
      // En modo no-cors, no puedes acceder directamente al cuerpo de la respuesta.
      console.log('Solicitud GET realizada con éxito en modo no-cors');
    } catch (error) {
      console.log(error);
    }
  };

  //POST
  const crear = async (form) => {
    try {
      const response = await fetch(`${url}/crear`, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      // En modo no-cors, no puedes acceder directamente al cuerpo de la respuesta.
      console.log('Solicitud POST realizada con éxito en modo no-cors');
    } catch (error) {
      console.log(error);
    }
    getEmpleados();
  };

  //PUT
  const actualizar = async (form) => {
    try {
      const response = await fetch(`${url}/actualizar`, {
        method: "PUT",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      // En modo no-cors, no puedes acceder directamente al cuerpo de la respuesta.
      console.log('Solicitud PUT realizada con éxito en modo no-cors');
    } catch (error) {
      console.log(error);
    }
    getEmpleados();
  };

  //DELETE
  const eliminar = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Deseas eliminar usuario?",
      showCancelButton: true,
      confirmButtonText: "Si",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/delete/${id}`, {
          method: "DELETE",
          mode: 'no-cors',
        })
          .then(() => {
            console.log('Solicitud DELETE realizada con éxito en modo no-cors');
          })
          .catch((error) => console.log(error));
      } else {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const clearForm = () => {
    setForm(initialForm);
  };
  
  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <>
      <div className="flex bg-gray mt-10 mx-auto w-[80%]  justify-center gap-10 mb-10">
        <div className="mt-10">
          <Form
            form={form}
            setForm={setForm}
            crear={crear}
            actualizar={actualizar}
            clearForm={clearForm}
          />
        </div>
        <div className="mt-10">
          <Table empleados={empleados} setForm={setForm} eliminar={eliminar} />
        </div>
      </div>
    </>
  );
}

export default App;

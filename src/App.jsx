import { useEffect, useState } from "react";
import Axios from "axios";
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
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Otros encabezados que puedan ser necesarios
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error during fetch operation:', error);
    }
  };
  

  //POST
  const crear = async (form) => {
    try {
      const respuesta = await Axios.post(`${url}/crear`, form);
      const data = await respuesta.data;
      setEmpleados([data]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Usuario ${form.nombre} creado!`,
        showConfirmButton: false,
        timer: 1500,
      });
      setForm(initialForm);
    } catch (error) {
      console.log(error);
    }
    getEmpleados();
  };

  //PUT
  const actualizar = async (form) => {
    try {
      const respuesta = await Axios.put(`${url}/actualizar`, form);
      const data = await respuesta.data;
      setEmpleados([data]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Usuario ${form.nombre} actualizado!`,
        showConfirmButton: false,
        timer: 1500,
      });
      setForm(initialForm);
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
        Axios.delete(`${url}/delete/${id}`).then(() => {
          getEmpleados();
          Swal.fire({
            icon: "success",
            position: "center",
            title: `Usuario borrado!`,
            showConfirmButton: false,
            timer: 1500,
          });
          setForm(initialForm);
        });
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

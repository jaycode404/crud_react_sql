import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
export function Form({ form, setForm, crear, actualizar, clearForm }) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (Object.values(form).some((value) => !value)) {
      Swal.fire({
        title: "Llena todos los camopos",
        icon: "warning",
      });
      return;
    } else {
      if (form.id) {
        actualizar(form);
      } else {
        crear(form);
      }
    }
  };
  return (
    <Card color="white" shadow={true} className="p-10">
      <Typography variant="h4" color="blue-gray">
        Llena el formulario
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Datos de nuevo empleado...
      </Typography>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nombre
          </Typography>
          <Input
            type="text"
            value={form.nombre}
            size="lg"
            name="nombre"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Edad
          </Typography>
          <Input
            type="number"
            value={form.edad}
            size="lg"
            name="edad"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Pais
          </Typography>
          <Input
            type="text"
            value={form.pais}
            size="lg"
            name="pais"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Puesto
          </Typography>
          <Input
            type="text"
            value={form.puesto}
            size="lg"
            name="puesto"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="flex gap-5">
          <Button
            type="submit"
            className="mt-6"
            fullWidth
            color={form.id ? "orange" : "black"}
          >
            {form.id ? "guradar cambios" : " Enviar"}
          </Button>
          {form.id && (
            <Button
              className="mt-6"
              color="red"
              onClick={() => {
                clearForm();
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

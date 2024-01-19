import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Nombre", "Edad", "Pais", "Puesto", "Opciones"];

export function Table({ empleados, setForm, eliminar }) {
  return (
    <Card className="h-auto w-[100%] rounded-table">
      <table className="w-full min-w-max table-auto text-left ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {empleado.nombre}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {empleado.edad}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {empleado.pais}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {empleado.puesto}
                </Typography>
              </td>
              <td className="p-4 flex gap-4">
                <Button
                  color="blue"
                  onClick={() => {
                    setForm(empleado);
                  }}
                >
                  Editar
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    eliminar(empleado.id);
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {empleados.length === 0 && (
            <tr>
              <td>
                <Typography variant="h6" className="p-3">Nada...</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}

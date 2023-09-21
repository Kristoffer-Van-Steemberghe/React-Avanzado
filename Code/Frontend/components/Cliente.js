import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id:$id)
    }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Cliente = ({cliente}) => {

    // Mutation para eliminar cliente
    const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            // Obtener una copia del objeto de cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter( clienteActual => clienteActual.id !== id )
                }
            })
        }
    });

    const { id, nombre, apellido, empresa, email } = cliente;

    // Eliminar cliente
    const confirmarEliminarCliente = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!',
            cancelButtonText: '¡No, cancelar!'
          }).then( async (result) => {
            if (result.isConfirmed) {

                
                try {
                    // Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });
                    // console.log(data);
                    
                    Swal.fire(
                        '¡Eliminado!',
                        'El cliente ha sido eliminado.',
                        'success'
                    )
                } catch (error) {
                    console.log(error);    
                }
            }
          })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{nombre} {apellido}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarCliente(id)}
                >
                    Eliminar

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </td>
        </tr>
    );
}

export default Cliente;
# [GraphQL](https://graphql.org/) y REST.
---
Las REST API'S no tienen nada de malo, pero podemos encontrar grandes beneficios en [GraphQL](https://graphql.org/).
[GraphQL](https://graphql.org/) está desarrollado pensando en el performance, las aplicaciones y los sitios web de [GraphQL](https://graphql.org/) son bastante rápidos y está diseñado para utilizar únicamente los campos/datos que necesitamos.
Además en [GraphQL](https://graphql.org/) solo hay una URL.

## El Problema de las REST API's.
---
En un caso donde queramos consultar todos los clientes, todos los productos, todos los vendedores, tendríamos una URL para
- ``/clientes``
- otra para ``/vendedores``
- y otra para ``/productos``

Cosa que no sucede en [GraphQL](https://graphql.org/) porque aquí vamos a definir un ``query`` de tipo cliente que requiere nombre, empresa y email
````graphql
query {
  clientes {
    nombre
    empresa
    email
  }
}
````
nos vamos a traer **únicamente** los campos que requerimos.
Ahora regresando al ejemplo anterior donde tenemos clientes y productos podemos tener algo así
````graphql
query {
  clientes {
    nombre
    empresa
    email
  }
  productos {
    nombre
    precio
    existencia
  }
}
````
Una única consulta en la que se traiga los resultados de clientes y de productos en una sola línea de código.

### Beneficios de [GraphQL](https://graphql.org/)
---
- Se pueden realizar consultas y mostrar los datos que se necesitan únicamente.
- No se requiere crear nuevos endpoints.
- No importa la versión ya que siempre es compatible con versiones anteriores.
- Se puede instalar sobre una API o base de datos ya existente.
- Y por último, es independiente de lenguaje.

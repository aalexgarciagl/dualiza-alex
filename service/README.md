# Documentación de la API REST

## Registro

### Ruta

`POST /api/register`

### Descripción

Esta ruta registra usuarios en el sistema.

### Parámetros de Consulta

Ninguno.

### Respuesta Exitosa

- Código de Estado: 201 Created
- Contenido:

```json
{
    "success": true,
    "data": {
        "nombre": "Usuario Root",
        "email": "root@gmail.com",
        "foto": "src",
        "dni_cif": "05723411E",
        "direccion": "Calle toledo 28",
        "updated_at": "2023-11-29T16:08:35.000000Z",
        "created_at": "2023-11-29T16:08:35.000000Z",
        "id": 13
    },
    "message": "User successfully registered!"
}
```

---
## Login


### Ruta

`POST /api/login`

### Descripción

Esta ruta permite el logeo inicial

### Parámetros de Consulta

Ninguno.

### Respuesta Exitosa

- Código de Estado: 200 OK
- Contenido:

```json
{
    "success": true,
    "message": "User logged-in!",
    "data": {
        "id": 13,
        "nombre": "Usuario Root",
        "email": "root@gmail.com",
        "foto": "src",
        "email_verified_at": null,
        "dni_cif": "05723411E",
        "direccion": "Calle toledo 28",
        "created_at": "2023-11-29T16:08:35.000000Z",
        "updated_at": "2023-11-29T16:08:35.000000Z"
    }
}
```
---

## Login token

### Ruta

`POST /api/login/token`

### Descripción

Esta ruta devuelve un token con la abilitie del rol especificada en el json

### Respuesta Exitosa

- Código de Estado: 200 OK
- Contenido:

```json
{
    "success": true,
    "data": {
        "token": "1|uVlK2Xhm7jJGnTjmgCjrnoWlUWCgwQfqIbYNmO5v13f757d7",
        "name": null
    },
    "message": "Usuario logeado correcatemnte",
    "user": {
        "id": 13,
        "nombre": "Usuario Root",
        "email": "rootsd2@gmail.com",
        "foto": "src",
        "email_verified_at": null,
        "dni_cif": "05723411E",
        "direccion": "Calle toledo 28",
        "created_at": "2023-11-29T16:08:35.000000Z",
        "updated_at": "2023-11-29T16:08:35.000000Z"
    }
}
```
---

## Logout

### Ruta

`POST /api/logout`

### Descripción

Esta ruta cierra la sesion y elimina los tokens activos de un usuario

### Respuesta Exitosa

- Código de Estado: 200 OK
- Contenido:

```json
{
    "email":"root2@gmail.com"
}
```

## Obtener todos los usuarios

### Ruta
`GET /api/admin/usuarios`

### Descripcion

Esta ruta devulve todos los usuarios de una empresa

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "id": 1,
    "nombre": "Usuario1",
    "email": "usuario1@example.com"
  },
  {
    "id": 2,
    "nombre": "Usuario2",
    "email": "usuario2@example.com"
  },
  // ... otros usuarios
````

## Insertar un usuario

### Ruta
`POST /api/admin/usuarios`

### Descripcion

Esta ruta inserta un usuario

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "id": 1,
    "nombre": "Usuario1",
    "email": "usuario1@example.com"
  },
  {
    "id": 2,
    "nombre": "Usuario2",
    "email": "usuario2@example.com"
  },
  // ... otros usuarios
````

## Actualizar usuario  

### Ruta
`PUT /api/admin/usuarios/{id}`

### Descripcion

Actualiza el usuario.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "nombre" : "prueba",
    "email":"prueba@gmail.com",
    "password":"prueba",
    "dni_cif":"pruebaL",
    "direccion":"prueba"
  }   
````


## Borrar usuario  

### Ruta
`DELETE /api/admin/usuarios/{id}`

### Descripcion

Borra el usuario.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
  {
    "message": "Usuario eliminado correctamente."
  }
````


## Entregar lote  

### Ruta
`POST /api/colaborador/entrega/{id}`

### Descripcion

Colaborador entrega lote.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
  "ubicacion":"23 23",
  "componentes": [
    {
      "nombre": "RAM",
      "cantidad": 5
      },
    {
      "nombre": "Disco dusro",
      "cantidad": 10
    }
  ]
}
````


## Administrador añade rol a usuario  

### Ruta
`PUT /api/admin/usuarios/roles/{id}`

### Descripcion

El administrador le añade un rol al usuario.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "rol":"clasificador"
  }
````


## Administrador elimina rol a usuario  

### Ruta
`DELETE /api/admin/usuarios/roles/{id}`

### Descripcion

El administrador le elimina un rol al usuario.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "rol":"admin"
  }
````


## Usuario cambia rol 

### Ruta
`PUT /api/usuarios/cambiar_rol/{id}`

### Descripcion

El usuario cambia de rol.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "rol":"admin"
  }
````


## Usuario cambia contraseña 

### Ruta
`PUT /api/usuarios/password/{id}`

### Descripcion

El usuario pide para cambiar su contraseña.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
  {
    "oldPassword":"test",
    "newPassword":"asdasd"
  }
````


## Crear componentes

### Ruta
`POST /api/admin/componentes`

### Descripcion

Inserta componentes en la base de datos.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
{
  "componentes": [
    {
      "nombre": "Componente1",
      "hardware": false
    },
    {
      "nombre": "Componente2",
      "hardware": true
    },
    {
      "nombre": "Componente3",
      "hardware": false
    },
    {
      "nombre": "Componente4",
      "hardware": true
    }
  ]
}
````


## Añadir componentes a inventario

### Ruta
`POST /api/admin/inventario/componentes`

### Descripcion

Inserta componentes en la base de datos.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
{
  "componentes": [
    {
      "nombre": "RAM",
      "cantidad": 1
    },
    {
      "nombre": "Disco duro",
      "cantidad": 2
    },
    {
      "nombre": "Placa base",
      "cantidad": 3
    }
  ]
}
````


## Cambiar estado clasificador admin

### Ruta
`POST /api/admin/clasificador/entrega/cambio_estado/{id}`

### Descripcion

Cambia el estado de la entrega.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
{
    "estado":"clasificado"
}
````


## Cancelar el lote de un colaborador

### Ruta
`PUT /api/colaborador/entrega/cambio_estado/{id_lote}/{id_usuario}  `

### Descripcion

Cancela el lote de algun colaborador.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Contenido: 
````json
{
    "estado":"cancelado"
}
````


## Obtener todos los roles

### Ruta
`GET /api/usuarios/roles/{id}`

### Descripcion

Obtiene todos los roles del usuario.  

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "success": false,
    "message": "Usuario no tiene roles."
}
````

## Colaborador entrega un lote

### Ruta
`POST /api/colaborador/entrega/{id_usuario}`

### Descripcion

Colabor dona un lote  

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
  "latitud":"23",
  "longitud":"23",
  "descripcion":"asd",
  "estado":"enviado"
}
````
## Colaborador cambia el estado de su lote

### Ruta
`PUT /api/colaborador/entrega/cambio_estado/{id_lote}/{id_usuario}`

### Descripcion

Colabor cancela un lote 

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "estado":"cancelado"
}
````

## Colaborador recibe todos sus lotes

### Ruta
`GET /api/colaborador/entrega/cambio_estado/{id_lote}/{id_usuario}`

### Descripcion

Colabor ve todos sus lotes

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Clasificador añade componente a un lote

### Ruta
`POST /api/clasificar/componente/{id_lote}`

### Descripcion

Clasificador indica un componente que tiene un lote

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "componente":"asdasd",
    "cantidad":3,
    "descripcion":"Rams en buen estado"
}
````

## Clasificador marca un lote como clasificado

### Ruta
`PUT /api/clasificar/entrega/{id_lote}`

### Descripcion

Clasificador marca que un lote ya esta clasificado

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "estado":"clasificado"
}
````
## Mostrar todos los lotes sin clasificar

### Ruta
`GET /api/clasificador/lotes_pendientes`

### Descripcion

Muestra todos los lotes pendientes de clasificar

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Devuelve componentes clasificados de un lote

### Ruta
`GET /api/lote/componentes/{id_lote}`

### Descripcion

Devuelve los componentes que tiene un lote clasificados

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Insertar componentes que admite el sistema

### Ruta
`POST /api/componentes/insertar`

### Descripcion

Inserta un componente que admite el sistema

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "nombre":"Monitor",
    "hardware":true
}
````

## Actualiza la informacion de un componente

### Ruta
`PUT /api/componentes/actualizar/{id_componente}`

### Descripcion

Actualiza los datos de un componente

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "nombre":"HHD",
    "hardware":true
}
````

## Elimina un componente admitido por el sistema

### Ruta
`DELETE /api/componentes`

### Descripcion

Elimina un componente del sistema

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Obtiene todos los componentes que admite el sistema

### Ruta
`GET /api/componentes`

### Descripcion

Obtiene informacion de todos los componentes admitidos

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Devuelve la informacion de todos los lotes

### Ruta
`GET /api/lotes`

### Descripcion

Obtiene todos los lotes en el sistema

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 

## Diseñador crea una receta

### Ruta
`POST /api/disenador/recetas/{id_diseñador}`

### Descripcion

Se crea una receta de una joya

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
	"joya": {
		"nombre": "pulsera",
        "foto":"https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg",
		"componentes": [
			{
				"nombre": "Correa",
				"cantidad": 1
			},
			{
				"nombre": "RAM",
				"cantidad": 1
			},
			{
				"nombre": "Procesador",
				"cantidad": 2
			}
		]
	}
}
````

## Diseñador obtiene todas las recetas creadas

### Ruta
`GET /api/disenador/recetas/{id_diseñador}`

### Descripcion

Obtiene todas las recetas de las joyas que hay creadas

### Respuesta Existosa

- Código de Estado: 200 OK


## Crea una receta aleatoria

### Ruta
`POST /api/disenador/recetas/{id_diseñador}`

### Descripcion

Crea una receta aleatoria en funcion de las recetas ya creadas segun el componente por el que se le pida inspirarse

### Respuesta Existosa

- Código de Estado: 200 OK
- Respuesta: 
````json
{
    "joya":"Pulsera"
}
````


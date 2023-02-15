/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UsuariosController from 'App/Controllers/Http/UsuariosController'

Route.group(() => {
  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios')
  Route.get('/listar-todo', 'UsuariosController.getListarUsuariosTodos')
  Route.get('listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController-getlistarUsuarios')
  Route.get('/listar-usuarios-grupos', 'UsuariosController.getListarUsuariosYGrupos')
  Route.get('/buscar-id/:id', 'UsuariosController.buscarPorId')
  Route.get('/buscar-nombre/:nombre', 'UsuariosController.buscarPorNombre')
  Route.get('/listar-grupos', 'GruposController.getListarGrupos')


  Route.post('/registrar-usuario', 'UsuariosController.setRegistrarUsuario')
  Route.post('/registro-perfil', 'PerfilsController.setRegistrarPerfil')
  Route.post('/registro-publicacion', 'PublicacionesController.setRegistrarPublicacion')
  Route.post('/registro-grupos', 'GruposController.setRegistrarGrupo')
  Route.post('/registro-usuario-grupo', 'GrupoUsuariosController.setRegistrarGrupoUsuario')
  Route.put('/actualizar-usuario/:id', 'UsuariosController.actualizarUsuario')
  Route.delete('/eliminar-usuario/:id', 'UsuariosController.eliminarUsuario')

}).prefix('/api')

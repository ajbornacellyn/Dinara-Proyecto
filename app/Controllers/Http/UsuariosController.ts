import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async setRegistrarUsuario({request, response}: HttpContextContract){
    const dataUsuario = request.only(['codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono'])
    try {
      const codigoUsuario = dataUsuario.codigo_usuario;
      const UsuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
      if (UsuarioExistente == 0) {
        await Usuario.create(dataUsuario)
        response.status(200).json({"msg": "usuario registrado con exito!"})
      }else{
        response.status(400).json({"msg": "codigo del usuario ya se encuentra registrado!"})
      }
    } catch (e) {
      console.log(e)
      response.status(500).json({"msg": "error en el servidor !!"})
    }
  }
    public async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number> {
      const total = await Usuario.query().where({"codigo_usuario":codigo_usuario}).count("*").from("usuarios")
      return parseInt(total[0]['count(*)'])
    }
    public async getListarUsuarios():Promise<Usuario[]>{
      const usuarios = await Usuario.all()
      return usuarios
    }
    public async getListarUsuariosYPerfil(): Promise<Usuario[]>{
      const user = await Usuario
      .query()
      .preload('perfil')
      return user;
  }

  public async getListarUsuariosYPublicaciones(): Promise<Usuario[]>{
    const user = await Usuario
    .query()
    .preload('publicaciones')
    return user;
  }

  public async getListarUsuariosYGrupos(): Promise<Usuario[]>{
    const user = await Usuario
    .query()
    .preload('usuario_grupos')
    return user;
  }

  public async buscarPorId({request}: HttpContextContract){
    const id = request.param('id')
    const user = await Usuario.find(id);
    return user;
  }
  public async actualizarUsuario({request}: HttpContextContract){
    const id = request.param("id");
    const user = request.all();
    await Usuario.query().where('codigo_usuario', id).update({
        nombre_usuario: user.nombre,
        contrasena: user.contrasena,
        email: user.email,
        telefono: user.telefono,
    });
    return("Registro actualizado");

  }
  public async eliminarUsuario ({request}: HttpContextContract){
    const id = request.param('id');
    await Usuario.query().where('codigo_usuario', id).delete();
    return("Usuario eliminado")
  }

}


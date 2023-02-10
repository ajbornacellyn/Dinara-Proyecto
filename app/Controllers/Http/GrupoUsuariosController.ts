import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'

export default class GrupoUsuariosController {
  public async setRegistrarGrupoUsuario({request, response}: HttpContextContract){
    try {

      const dataGupoUsuario = request.only (["codigo_usuario", "codigo_grupo", "fecha_inicio"])
      const codigoUsuario = dataGupoUsuario.codigo_usuario
      const codigoGrupo = dataGupoUsuario.codigo_grupo
      const datosExistentes = await this.getValidarGrupoUsuarioExistente(codigoUsuario, codigoGrupo)

      switch (datosExistentes) {
        case 0:
          await UsuarioGrupo.create(dataGupoUsuario)
          response.status(200).json({"msg": "usuario registrado con exito!"})
          break;
        case 1:
          response.status(400).json({"msg": "El codigo del usuario no se encuentra registrado"})
          break;
        case 2:
          response.status(400).json({"msg": "El codigo del grupo no se encuentra registrado"})
          break;


    }
    } catch (error) {
      console.log(error)
      response.status(500).json({"msg": "error en el servidor !!"})

    }
}

  private async getValidarGrupoUsuarioExistente(codigo_grupo: Number, codigo_usuario: Number): Promise<Number> {
      let totalGrupo = await Grupo.query().where({"codigo_grupo": codigo_grupo}).count("*").from("grupos")
      let cantidadDatos = parseInt(totalGrupo[0]["count (*)"])
      if (cantidadDatos !==0) {
        let totalUsuario = await Usuario.query().where({"codigo_usuario": codigo_usuario}).count("*").from("usuarios")
        cantidadDatos = parseInt(totalUsuario[0]["count (*)"])
        if (cantidadDatos !==0) {
          return 0;
        }else{
          return 2; //usuario no existe
      }
    }else{
      return 1; //grupo no existe
    }
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
  async setRegistrarPerfil({ request, response }: HttpContextContract) {
    try {
      const dataPerfil = request.only(["codigo_perfil", "codigo_usuario", "nombre_perfil", "fecha_creacion"])
      const codigoPerfil = dataPerfil.codigo_perfil
      const codigoPerfilExistente: Number = await this.getValidarPerfilExistente(codigoPerfil);
      if (codigoPerfilExistente === 0) {
        await Perfil.create(dataPerfil)
        response.status(200).json({ "msg": "perfil registrado con exito!" })
      } else {
        response.status(400).json({ "msg": "codigo del perfil ya se encuentra registrado!" })
      }
    } catch (error) {
      response.status(500).json({ "msg": "error en el servidor !!" })
      console.log(error)
    }
  }

  private async getValidarPerfilExistente(codigo_perfil: Number): Promise<Number> {
    console.log(codigo_perfil)
    const total = await Perfil.query().where({ 'codigo_perfil': codigo_perfil }).count('*').from('perfils')
    return parseInt(total[0]['count(*)'])
  }
}

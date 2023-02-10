import{ HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacion from 'App/Models/Publicacione'

export default class PublicacionesController {
  async setRegistrarPublicacion({request, response}: HttpContextContract){
    try {
      const dataPublicacion = request.only(["codigo_publicacion", "codigo_grupo", "codigo_usuario", "titulo", "cuerpo"])
      const codigoPublicacion = dataPublicacion.codigo_publicacion
      const codigoPublicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion);
      if (codigoPublicacionExistente === 0) {
        await Publicacion.create(dataPublicacion)
        response.status(200).json({"msg": "publicacion registrada con exito!"})
      }else{
        response.status(400).json({"msg": "codigo de la publicacion ya se encuentra registrado!"})
      }
    } catch (error) {
      response.status(400).json({"msg": "error en el servidor !!"})
    }
  }

  private async getValidarPublicacionExistente(codigo_publicacion: Number): Promise<Number> {
    const total = await Publicacion.query().where({"codigo_publicacion":codigo_publicacion}).count("*").from("publicaciones")
    return parseInt(total [0] ["count (*)"])
  }
}

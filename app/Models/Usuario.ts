import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasMany, hasOne, HasMany, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicacione from './Publicacione'
import Grupo from './Grupo'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true }) codigo_usuario: number
  @column() public nombre_usuario: string
  @column() public contraseña: string
  @column() public email: string
  @column() public telefono: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => Perfil, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario'
  })
  public perfil: HasOne<typeof Perfil>

  @hasMany(() => Publicacione, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public publicaciones: HasMany<typeof Publicacione>

  @manyToMany(() => Grupo, {
    localKey: 'codigo_usuario',
    pivotForeignKey: 'codigo_usuario',
    relatedKey: 'codigo_grupo',
    pivotRelatedForeignKey: 'codigo_grupo',
    pivotTable: 'usuario_grupos',

  })
  public usuario_grupos: ManyToMany<typeof Grupo>
}

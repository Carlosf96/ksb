import {
  Table,
  Column,
  HasOne,
  DataType,
  BelongsTo,
  BeforeBulkCreate,
  BeforeCreate,
  AfterCreate,
  BeforeUpdate,
  BeforeBulkUpdate,
  ForeignKey,
  BeforeDestroy,
  HasMany
} from "sequelize-typescript";
import { BaseModel } from "../libraries/BaseModel";
import { Profile } from "./Profile";
import * as bcrypt from "bcrypt";

@Table({
  tableName: "role"
})
export class Role extends BaseModel<Role> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  level: number;

  @Column({
    type: DataType.JSON
  })
  permissions: string[];


  toJSON() {
    let object: any = super.toJSON();
    delete object.role;
    delete object.password;
    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }
}

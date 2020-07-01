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
    tableName: "job"
  })
  export class Job extends BaseModel<Job> {
    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
      })
      description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    salary: number;

  
    toJSON() {
      let object: any = super.toJSON();
      delete object.role;
      delete object.password;
      delete object.createdAt;
      delete object.updatedAt;
      return object;
    }
  }
  
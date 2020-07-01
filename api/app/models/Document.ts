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
  import { Candidate } from "./Candidate";
  import * as bcrypt from "bcrypt";
  
  @Table({
    tableName: "document"
  })
  export class Document extends BaseModel<Document> {
    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    name: string;

    @ForeignKey(() => Candidate)
    @Column
    candidateId: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    type: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    path: string;
  
    toJSON() {
      let object: any = super.toJSON();
      delete object.role;
      delete object.password;
      delete object.createdAt;
      delete object.updatedAt;
      return object;
    }
  }
  
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
import { User } from "./User";
import { Candidate } from "./Candidate";
import * as bcrypt from "bcrypt";

@Table({
  tableName: "feedback"
})
export class Feedback extends BaseModel<Feedback> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Candidate)
  @Column
  candidateId: number;

  @BelongsTo(() => Candidate)
  candidate: Candidate;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null
  })
  rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null
  })
  description: string;

  toJSON() {
    let object: any = super.toJSON();
    delete object.role;
    delete object.password;
    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }
}

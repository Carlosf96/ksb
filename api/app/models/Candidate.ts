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
import { Feedback } from "./Feedback";

@Table({
  tableName: "candidate"
})
export class Candidate extends BaseModel<Candidate> {
  @HasMany(() => Feedback)
  feedbacks: Feedback[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  website: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  phone: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  jobTitle: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  stage: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  status: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null,
  })
  pastRecruiters: object[];

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null,
  })
  currentRecruiters: object[];

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null,
  })
  positions: string[];

  toJSON() {
    let object: any = super.toJSON();
    delete object.role;
    delete object.password;
    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }
}

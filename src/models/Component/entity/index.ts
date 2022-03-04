import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("component")
export class Component extends CommonEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  name!: string;

  @Column()
  attribute!: object;

  @Column({ default: false })
  isDeleted!: boolean;
}

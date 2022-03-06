import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("style")
export class Style extends CommonEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  layouts!: ObjectID[];

  @Column({ nullable: true })
  components!: ObjectID[];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;
}

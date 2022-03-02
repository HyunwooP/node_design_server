import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("layout")
export class Layout extends CommonEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  attribute!: object;

  // @ManyToOne(() => Style, (style) => style.layout)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

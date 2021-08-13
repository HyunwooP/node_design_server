import { ObjectID } from "mongodb";
import { Entity, ObjectIdColumn, Column } from "typeorm";
import { CommonEntity } from "../../Common/entity";

export interface LayoutIE {
  _id?: ObjectID;
  name?: string;
  attribute?: object | string | string[];
  isDeleted?: boolean;
}

@Entity("Layout")
export class Layout extends CommonEntity implements LayoutIE {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  attribute: object | string | string[];

  // @ManyToOne(() => Style, (style) => style.layout)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

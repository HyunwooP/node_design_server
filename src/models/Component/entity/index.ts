import { ObjectID } from "mongodb";
import { Entity, ObjectIdColumn, Column } from "typeorm";
import { toObjectId } from "../../../utils";
import { CommonEntity } from "../../Common/entity";

export interface ComponentIE {
  _id?: ObjectID;
  name?: string;
  attribute?: object | string | string[];
  isDeleted?: boolean;
}

@Entity("Component")
export class Component extends CommonEntity implements ComponentIE {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  attribute: object | string | string[];

  // @ManyToOne(() => Style, (style) => style.component)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

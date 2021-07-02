import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { CommonEntity } from "../../Common/entity";

export interface LayoutIE {
  id?: ObjectID;
  name?: string;
  attribute?: object | string | string[];
  isDeleted?: boolean;
}

@Entity("Layout")
export class Layout extends CommonEntity implements LayoutIE {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  attribute: object | string | string[];

  // @ManyToOne(() => Style, (style) => style.layout)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

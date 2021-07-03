import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { CommonEntity } from "../../Common/entity";

export interface ComponentIE {
  id?: ObjectID;
  name?: string;
  attribute?: object | string | string[];
  isDeleted?: boolean;
}

@Entity("Component")
export class Component extends CommonEntity implements ComponentIE {
  @ObjectIdColumn()
  id: ObjectID;

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

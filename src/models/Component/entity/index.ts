import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { CommonEntity, CommonEntityIE } from "../../Common/entity";
import { SortType } from "../../Common/type";

export interface ComponentIE extends CommonEntityIE {
  // 클라이언트에서 넘기는 데이터
  nameSort?: SortType;
  ///////////////////////

  _id?: ObjectID;
  name?: string;
  attribute?: object;
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
  attribute: object;

  // @ManyToOne(() => Style, (style) => style.component)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

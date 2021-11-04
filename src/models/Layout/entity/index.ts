import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { CommonEntity, CommonEntityIE } from "../../Common/entity";
import { SortType } from "../../Common/interface";

export interface LayoutIE extends CommonEntityIE {
  // 클라이언트에서 넘기는 데이터
  nameSort?: SortType;
  ///////////////////////

  _id?: ObjectID;
  name?: string;
  attribute?: object;
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
  attribute: object;

  // @ManyToOne(() => Style, (style) => style.layout)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}

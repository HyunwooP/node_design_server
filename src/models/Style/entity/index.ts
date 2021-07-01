import { CommonEntity } from "../../Common/entity";
import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

export interface StyleIE {
  id?: ObjectID;
  name?: string;
  attribute?: object | string | string[];
  isDeleted?: boolean;
}

@Entity("Style")
export class Style extends CommonEntity implements StyleIE {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  attribute: object | string | string[];

  @Column({ default: false })
  isDeleted: boolean = false;
}

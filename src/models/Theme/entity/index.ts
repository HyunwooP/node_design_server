import { CommonEntity } from "../../Common/entity";
import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

export interface ThemeIE {
  id?: ObjectID;
  name?: string;
  styles?: ObjectID[];
  isDeleted?: boolean;
}

@Entity("Theme")
export class Theme extends CommonEntity implements ThemeIE {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  styles: ObjectID[];

  @Column({ default: false })
  isDeleted: boolean = false;
}

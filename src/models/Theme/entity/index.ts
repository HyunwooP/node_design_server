import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { CommonEntity } from "../../Common/entity";

export interface ThemeIE {
  id?: ObjectID;
  name?: string;
  // styles?: Style[];
  styles?: ObjectID[];
  isActive?: boolean;
  isDeleted?: boolean;
}

@Entity("Theme")
export class Theme extends CommonEntity implements ThemeIE {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    unique: true,
  })
  name: string;

  // @OneToMany(() => Style, (style) => style.parent)
  @Column()
  styles: ObjectID[];

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isDeleted: boolean = false;
}

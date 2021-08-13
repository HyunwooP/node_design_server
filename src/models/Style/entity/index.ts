import { ObjectID } from "mongodb";
import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { CommonEntity } from "../../Common/entity";
import { Theme } from "../../../models/Theme/entity";

export interface StyleIE {
  _id?: ObjectID;
  name?: string;
  // layout?: Layout[];
  // component?: Component[];
  layouts?: ObjectID[];
  components?: ObjectID[];
  isActive?: boolean;
  isDeleted?: boolean;
}

@Entity("Style")
export class Style extends CommonEntity implements StyleIE {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    unique: true,
  })
  name: string;

  // @OneToMany(() => Layout, (layout) => layout.parent)
  @Column({
    nullable: true,
  })
  layouts: ObjectID[];

  // @OneToMany(() => Component, (component) => component.parent)
  @Column({
    nullable: true,
  })
  components: ObjectID[];

  // @ManyToOne(() => Theme, (theme) => theme.styles)
  // parent: Theme;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isDeleted: boolean = false;
}

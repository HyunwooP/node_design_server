import { Entity, ObjectIdColumn, Column, ObjectID, ManyToOne } from "typeorm";
import { CommonEntity } from "../../Common/entity";
import { Theme } from "../../../models/Theme/entity";

export interface StyleIE {
  id?: ObjectID;
  name?: string;
  // layout?: Layout[];
  // component?: Component[];
  layout?: ObjectID[];
  component?: ObjectID[];
  isActive?: boolean;
  isDeleted?: boolean;
}

@Entity("Style")
export class Style extends CommonEntity implements StyleIE {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  // @OneToMany(() => Layout, (layout) => layout.parent)
  @Column()
  layout: ObjectID[];

  // @OneToMany(() => Component, (component) => component.parent)
  @Column()
  component: ObjectID[];

  @ManyToOne(() => Theme, (theme) => theme.styles)
  parent: Theme;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isDeleted: boolean = false;
}

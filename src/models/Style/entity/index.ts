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

  @Column({
    unique: true,
  })
  name: string;

  // @OneToMany(() => Layout, (layout) => layout.parent)
  @Column({
    nullable: true,
  })
  layout: ObjectID[];

  // @OneToMany(() => Component, (component) => component.parent)
  @Column({
    nullable: true,
  })
  component: ObjectID[];

  // @ManyToOne(() => Theme, (theme) => theme.styles)
  // parent: Theme;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isDeleted: boolean = false;
}

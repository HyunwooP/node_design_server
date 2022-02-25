import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { CommonEntity } from "../../Common/entity";

@Entity("Style")
export class Style extends CommonEntity {
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

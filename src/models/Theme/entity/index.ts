import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("theme")
export class Theme extends CommonEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({
    unique: true,
  })
  name!: string;

  // @OneToMany(() => Style, (style) => style.parent)
  @Column()
  styles!: ObjectID[];

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ default: false })
  isDeleted: boolean = false;

  findThemeItem() {
    return [
      // 사용 가능한 테마만...
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "Style",
          let: { styleId: "$styles" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$styleId"] } } }],
          as: "styles",
        },
      },
      { $unwind: "$styles" },
      // 테마에 꽂혀있는 스타일중 사용 가능 한것만...
      {
        $match: {
          "styles.isActive": true,
          "styles.isDeleted": false,
        },
      },
      {
        $lookup: {
          from: "Layout",
          let: { layoutId: "$styles.layouts" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$layoutId"] } } }],
          as: "styles.layouts",
        },
      },
      {
        $lookup: {
          from: "Component",
          let: { componentId: "$styles.components" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$componentId"] } } }],
          as: "styles.components",
        },
      },
      // { $unwind: "$styles.layout" },
      // { $unwind: "$styles.component" },
    ];
  }
}

import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("style")
export class Style extends CommonEntity {
  @ObjectIdColumn({ comment: "고유키" })
  _id!: ObjectID;

  @Column({ unique: true, comment: "스타일 이름" })
  name!: string;

  @Column({ nullable: true, comment: "스타일에 포함되는 레이아웃 키값" })
  layouts!: ObjectID[];

  @Column({ nullable: true, comment: "스타일에 포함되는 컴포넌트 키값" })
  components!: ObjectID[];

  @Column({ default: true, comment: "활성 여부" })
  isActive!: boolean;

  @Column({ default: false, comment: "삭제 여부" })
  isDeleted!: boolean;
}

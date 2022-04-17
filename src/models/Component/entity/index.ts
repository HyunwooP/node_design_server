import { CommonEntity } from "@/models/Common/entity";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("component")
export class Component extends CommonEntity {
  @ObjectIdColumn({
    comment: "고유키",
  })
  _id!: ObjectID;

  @Column({ unique: true, comment: "컴포넌트 이름" })
  name!: string;

  @Column({ comment: "컴포넌트 스타일 속성" })
  attribute!: object;

  @Column({ default: false, comment: "삭제 여부" })
  isDeleted!: boolean;
}

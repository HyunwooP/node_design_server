import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { CommonEntity } from "./Common";

@Entity("layout")
export class Layout extends CommonEntity {
  @ObjectIdColumn({ comment: "고유키" })
  _id!: ObjectID;

  @Column({ unique: true, comment: "레이아웃 이름" })
  name!: string;

  @Column({ comment: "레이아웃 스타일 속성" })
  attribute!: object;

  @Column({ default: false, comment: "삭제 여부" })
  isDeleted!: boolean;
}

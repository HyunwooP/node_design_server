import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export interface CommonReqIE {
  searchKeyword?: string;
}
export interface CommonEntityIE extends CommonReqIE {
  createdAt?: Date;
  updatedAt?: Date;
}
export class CommonEntity implements CommonEntityIE {
  @CreateDateColumn({
    name: "crt_dt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "udt_dt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}

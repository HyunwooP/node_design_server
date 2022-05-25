import { CommonStatusCode } from "@/lib";
import { CommonAPIResponseType } from "@/lib/type";
import {
  HandlerParamsType,
  healthCheckMemory,
  nowMemoryPercent,
  onFailureHandler,
} from "@/utils";

export const _health = (): CommonAPIResponseType<HandlerParamsType> => {
  if (healthCheckMemory()) {
    onFailureHandler({
      status: CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: `현재 메모리 점유율이 90% 이상입니다. - ${new Date().toISOString()}`,
    });
  }

  return {
    status: CommonStatusCode.OK,
    message: `현재 메모리는 ${nowMemoryPercent()}% 입니다. - ${new Date().toISOString()}`,
  };
};

import { CommonStatusCode, getErrorItems, onFailureHandler } from "@/lib";
import { HandlerParamsType } from "@/lib/function";
import { CommonAPIResponseType } from "@/lib/type";
import { healthCheckMemory, nowMemoryPercent } from "@/utils";

export const _health = (): CommonAPIResponseType<HandlerParamsType> => {
  try {
    if (healthCheckMemory()) {
      onFailureHandler({
        status: CommonStatusCode.INTERNAL_SERVER_ERROR,
        message: `현재 메모리 점유율이 90% 이상입니다. - ${new Date().toISOString()}`,
      });
    }

    return {
      status: CommonStatusCode.OK,
      message: `현재 메모리는 ${nowMemoryPercent()}% 입니다. - ${new Date().toISOString()}`
    };
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

import { CommonStatusCode, getErrorItems, onFailureHandler } from "@/lib";
import { CommonAPIResponseType } from "@/lib/type";
import { healthCheckMemory } from "@/utils";

export const _health = (): CommonAPIResponseType<object> => {
  try {
    if (healthCheckMemory()) {
      onFailureHandler({
        status: CommonStatusCode.INTERNAL_SERVER_ERROR,
        message: `현재 메모리 점유율이 90% 이상입니다. - ${new Date().toISOString()}`,
      });
    }

    return {};
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

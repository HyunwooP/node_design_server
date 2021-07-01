import * as _ from "lodash";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { ThemeIE } from "../entity";

export const findOneTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    return await AppRepository.Theme.findOne({
      ...conditions,
      isDeleted: false,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findTheme = async (conditions: ThemeIE): Promise<ThemeIE[]> => {
  try {
    return await AppRepository.Theme.find({
      ...conditions,
      isDeleted: false,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const createTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    return await AppRepository.Theme.save(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const updateTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    const Theme: ThemeIE = await findOneTheme({ id: conditions.id });

    if (_.isUndefined(Theme)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    return await AppRepository.Theme.save(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const removeTheme = async (conditions: ThemeIE): Promise<object> => {
  try {
    await updateTheme({ id: conditions.id, isDeleted: true });
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

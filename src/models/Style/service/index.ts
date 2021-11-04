import * as _ from "lodash";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { QueryIE } from "../../../models/Common/interface";
import { toObjectId } from "../../../utils";
import { StyleIE } from "../entity";

export const findStyleCount = async (): Promise<String> => {
  try {
    return String(await AppRepository.Style.count());
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findOneStyle = async (conditions: StyleIE): Promise<StyleIE> => {
  try {
    return await AppRepository.Style.findOne({ ...conditions });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findStyle = async (
  conditions: StyleIE
): Promise<[StyleIE[], number]> => {
  try {
    let query: QueryIE = {
      where: {},
      order: {},
    };

    if (!_.isEmpty(conditions.searchKeyword)) {
      query.where = {
        name: {
          $regex: conditions.searchKeyword,
          $options: "i",
        },
      };
    }

    if (!_.isEmpty(conditions.nameSort)) {
      query.order.name = conditions.nameSort;
    }

    return await AppRepository.Style.findAndCount({
      ...conditions,
      ...query,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const createStyle = async (conditions: StyleIE): Promise<StyleIE> => {
  try {
    return await AppRepository.Style.create(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const updateStyle = async (conditions: StyleIE): Promise<StyleIE> => {
  try {
    const style: StyleIE = await findOneStyle({
      _id: toObjectId(conditions._id),
    });

    if (_.isUndefined(style)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 스타일 이름
    style.name = _.isUndefined(conditions.name) ? style.name : conditions.name;
    // 스타일에 포함된 컴포넌트
    style.components = _.isUndefined(conditions.components)
      ? style.components
      : conditions.components;
    // 스타일에 포함된 레이아웃
    style.layouts = _.isUndefined(conditions.layouts)
      ? style.layouts
      : conditions.layouts;
    // 사용 유무
    style.isActive = _.isUndefined(conditions.isActive)
      ? style.isActive
      : conditions.isActive;
    // 삭제 유무
    style.isDeleted = _.isUndefined(conditions.isDeleted)
      ? style.isDeleted
      : conditions.isDeleted;

    return await AppRepository.Style.save(style);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const removeStyle = async (conditions: StyleIE): Promise<object> => {
  try {
    await updateStyle({ _id: conditions._id, isDeleted: true });
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

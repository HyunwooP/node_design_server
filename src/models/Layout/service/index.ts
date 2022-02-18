import * as _ from "lodash";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getErrorItems,
  onFailureHandler,
} from "../../../lib";
import { QueryIE } from "../../../models/Common/interface";
import { toObjectId } from "../../../utils";
import { LayoutIE } from "../entity";

export const findLayoutCount = async (): Promise<String> => {
  try {
    return String(await AppRepository.Layout.count());
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findOneLayout = async (
  conditions: LayoutIE
): Promise<LayoutIE> => {
  try {
    return await AppRepository.Layout.findOne({ ...conditions });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findLayout = async (
  conditions: LayoutIE
): Promise<[LayoutIE[], number]> => {
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

    return await AppRepository.Layout.findAndCount({
      ...conditions,
      ...query,
    });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const createLayout = async (conditions: LayoutIE): Promise<LayoutIE> => {
  try {
    return await AppRepository.Layout.create(conditions);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const updateLayout = async (conditions: LayoutIE): Promise<LayoutIE> => {
  try {
    const layout: LayoutIE = await findOneLayout({
      _id: toObjectId(conditions._id),
    });

    if (_.isUndefined(layout)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 레이아웃 이름
    layout.name = _.isUndefined(conditions.name)
      ? layout.name
      : conditions.name;
    // 레이아웃 CSS 속성
    layout.attribute = _.isUndefined(conditions.attribute)
      ? layout.attribute
      : conditions.attribute;
    // 삭제 유무
    layout.isDeleted = _.isUndefined(conditions.isDeleted)
      ? layout.isDeleted
      : conditions.isDeleted;

    return await AppRepository.Layout.save(layout);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeLayout = async (conditions: LayoutIE): Promise<object> => {
  try {
    await updateLayout({ _id: conditions._id, isDeleted: true });
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

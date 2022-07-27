export type Sort = "ASC" | "DESC";

export type CommonRequest = {
  searchKeyword: string;
};

export type Query = {
  where: {
    // search
    [index: string]: {
      $regex: string;
      $options: string;
    };
  };
  order: {
    [index: string]: Sort;
  };
};

export type SortType = "ASC" | "DESC";

export type CommonRequestType = {
  searchKeyword: string;
};

export type QueryType = {
  where: {
    // search
    [index: string]: {
      $regex: string;
      $options: string;
    };
  };
  order: {
    [index: string]: SortType;
  };
};

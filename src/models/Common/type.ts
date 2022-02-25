export type SortType = "ASC" | "DESC" | undefined;

export type QueryType = {
  where?: {
    // search
    [index: string]: {
      $regex?: string;
      $options?: string;
    };
  };
  order?: {
    [index: string]: SortType;
  };
};

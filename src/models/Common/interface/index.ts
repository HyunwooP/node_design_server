export type SortType = "ASC" | "DESC" | undefined;

export interface QueryIE {
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
}

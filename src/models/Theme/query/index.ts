export const themeItemQuery = [
  // 사용 가능한 테마만...
  {
    $match: {
      isActive: true,
      isDeleted: false,
    },
  },
  {
    $lookup: {
      from: "Style",
      let: { styleId: "$styles" },
      pipeline: [{ $match: { $expr: { $in: ["$_id", "$$styleId"] } } }],
      as: "styles",
    },
  },
  { $unwind: "$styles" },
  // 테마에 꽂혀있는 스타일중 사용 가능 한것만...
  {
    $match: {
      "styles.isActive": true,
      "styles.isDeleted": false,
    },
  },
  {
    $lookup: {
      from: "Layout",
      let: { layoutId: "$styles.layout" },
      pipeline: [{ $match: { $expr: { $in: ["$_id", "$$layoutId"] } } }],
      as: "styles.layout",
    },
  },
  {
    $lookup: {
      from: "Component",
      let: { componentId: "$styles.component" },
      pipeline: [{ $match: { $expr: { $in: ["$_id", "$$componentId"] } } }],
      as: "styles.component",
    },
  },
  { $unwind: "$styles.layout" },
  { $unwind: "$styles.component" },
];

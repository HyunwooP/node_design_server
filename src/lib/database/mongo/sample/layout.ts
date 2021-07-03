interface SampleLayoutIE {
  [index: string]: any;
}
export const sampleLayouts: SampleLayoutIE = {
  BLACK_THEME_LAYOUT: {
    CONTAINER_LAYOUT: {
      backgroundColor: "black",
    },
    MODAL_LAYOUT: {
      border: "1px solid white",
    },
  },
  WHITE_THEME_LAYOUT: {
    CONTAINER_LAYOUT: {
      backgroundColor: "white",
    },
    MODAL_LAYOUT: {
      border: "1px solid black",
    },
  },
  GREEN_THEME_LAYOUT: {
    CONTAINER_LAYOUT: {
      backgroundColor: "green",
    },
    MODAL_LAYOUT: {
      backgroundColor: "red",
    },
  },
};

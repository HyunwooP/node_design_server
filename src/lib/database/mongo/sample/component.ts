interface SampleComponentIE {
  [index: string]: any;
}
export const sampleComponents: SampleComponentIE = {
  BLACK_THEME__MENU_BOX: {
    CONTAINER: {
      backgroundColor: "black",
      border: "1px solid white",
    },
    ITEM: {
      color: "white",
    },
    TEST_ITEM: "test", // 임의의 한줄 짜리 CSS
  },
  BLACK_THEME__SUB_MIT_BUTTON: {
    backgroundColor: "black",
    color: "white",
    border: "1px solid white",
  },
  BLACK_THEME__TEXT_BUTTON: {
    backgroundColor: "black",
    color: "white",
  },
  BLACK_THEME__ICON: {
    color: "white",
  },
  BLACK_THEME__COMMON_LABEL: {
    color: "white",
  },
  BLACK_THEME__CARD: {
    backgroundColor: "black",
    color: "white",
  },
  BLACK_THEME__LAYOUT: {
    backgroundColor: "white",
  },
  BLACK_THEME__MODAL_LAYOUT: {
    border: "1px solid black",
  },
  WHITE_THEME__MENU_BOX: {
    CONTAINER: {
      backgroundColor: "white",
      border: "1px solid black",
    },
    ITEM: {
      color: "black",
    },
  },
  WHITE_THEME__SUB_MIT_BUTTON: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
  },
  WHITE_THEME__TEXT_BUTTON: {
    backgroundColor: "white",
    color: "black",
  },
  WHITE_THEME__ICON: {
    color: "black",
  },
  WHITE_THEME__COMMON_LABEL: {
    color: "black",
  },
  WHITE_THEME__CARD: {
    backgroundColor: "white",
    color: "black",
  },
};

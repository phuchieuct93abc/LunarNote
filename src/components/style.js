import { StyleSheet } from "react-native";
const smallFontSize = 15;
const mediumFontSize = 25;
const largeFontSize = 35;
const black = "#606060";
const white = "#ffffff";
export const SmallFont = {
  description: {
    fontSize: smallFontSize
  },
  p: {
    fontSize: smallFontSize
  },
  strong: {
    fontSize: smallFontSize
  },
  em: {
    fontSize: smallFontSize
  }
};
export const MediumFont = {
  description: {
    fontSize: mediumFontSize
  },
  p: {
    fontSize: mediumFontSize
  },
  strong: {
    fontSize: mediumFontSize
  },
  em: {
    fontSize: mediumFontSize
  }
};

export const LargeFont = {
  description: {
    fontSize: largeFontSize
  },
  p: {
    fontSize: largeFontSize
  },
  strong: {
    fontSize: largeFontSize
  },
  em: {
    fontSize: largeFontSize
  }
};
export const CommonStyles = {
  flex: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },

  description: {
    fontSize: 25,
    marginBottom: 5,
    fontStyle: "italic"
  },
  p: {
    fontSize: 20,
    paddingLeft: 20
  },
  wrapper: {
    flex: 1
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  strong: {
    fontWeight: "bold",
    fontSize: 20
  },
  em: {
    fontWeight: "bold",
    fontSize: 20
  },
  ins: {
    fontWeight: "bold",
    fontSize: 20
  }
};
export const NightModeStyles = {
  wrapper: {
    backgroundColor: black
  },
  textColor: {
    color: white
  },
  description: {
    color: white
  },
  p: {
    color: "white"
  },
  strong: {
    color: white
  },
  em: {
    color: white
  },
  ins: {
    color: white
  }
};

export const scrollViewStyles = StyleSheet.create({
  fillParent: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 64,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export const LightModeStyles = {};

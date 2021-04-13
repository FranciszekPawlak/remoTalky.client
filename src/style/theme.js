import { createMuiTheme } from "@material-ui/core/styles";
import {
  blue,
  green,
  indigo,
  pink,
  yellow,
  orange,
} from "@material-ui/core/colors";

export const createTheme = (type) =>
  createMuiTheme({
    palette: {
      type,
      // primary: type === "light" ? indigo : pink,
    },
    overrides: {
      MuiList: {
        root: {
          listStyle: "none",
        },
      },
    },
  });

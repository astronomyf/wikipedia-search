import { combineReducers } from "redux";

import themeReducer from "./theme";
import articlesReducer from "./articles";

export default combineReducers({
  theme: themeReducer,
  articles: articlesReducer,
});

import * as actions from "./../actions/articlesActions";

export const initialState = {
  articles: [],
  loading: false,
  errors: false,
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ARTICLES:
      return { ...state, loading: true };
    case actions.GET_ARTICLES_SUCCESS:
      return { articles: action.payload, loading: false, errors: false };
    case actions.GET_ARTICLES_FAILURE:
      return { ...state, loading: false, errors: true };
    default:
      return state;
  }
}

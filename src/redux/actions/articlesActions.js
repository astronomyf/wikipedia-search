export const GET_ARTICLES = "GET_ARTICLES";
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS";
export const GET_ARTICLES_FAILURE = "GET_ARTICLES_FAILURE";

export const getArticles = () => ({
  type: GET_ARTICLES,
});

export const getArticlesSuccess = (articles) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: articles,
});

export const getArticlesFailure = () => ({
  type: GET_ARTICLES_FAILURE,
});

export function fetchWikipedia(lang, inputSearch) {
  return async (dispatch) => {
    dispatch(getArticles());

    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&exintro=1&prop=extracts|pageimages&pithumbsize=250&format=json&redirect=&origin=*&generator=search&gsrsearch=${inputSearch}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const { query } = data;
      const results = Object.values(query.pages);

      dispatch(getArticlesSuccess(results));
    } catch (e) {
      dispatch(getArticlesFailure());
    }
  };
}

/**
 * This function was used in Search.page.js to fetch data from the Wikipedia API.
 * Since I'm now using Redux to manage this particular api call I no longer need it.
 *
 * I leave it here as an example.
 */
function searchWiki() {
  this.setState({ resultSearch: [] }, async () => {
    const { inputSearch, lang } = this.state;

    const proxy = "https://cors-anywhere.herokuapp.com/";

    try {
      const url = `${proxy}https://${lang}.wikipedia.org/w/api.php?action=query&exintro=1&prop=extracts|pageimages&pithumbsize=250&format=json&redirect=&origin=*&generator=search&gsrsearch=${inputSearch}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        const { query } = data;

        if (query) {
          const results = Object.values(query.pages);
          this.setState({
            resultSearch: results,
            error: false,
          });
        } else {
          this.setState({ resultSearch: [], error: true });
        }
      }
    } catch (e) {
      console.error("API call went wrong.", e);
      this.setState({ resultSearch: [], error: true });
    } finally {
      this.setState({ loading: false });
    }
  });
}

export { searchWiki };

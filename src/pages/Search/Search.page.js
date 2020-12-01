import React, { Component } from "react";

import Header from "./../../components/Header/Header";
import Select from "./../../components/Select/Select";
import Logo from "./../../components/Logo/Logo";
import Card from "./../../components/Card/Card";
import Footer from "./../../components/Footer/Footer";

import "./Search.page.css";

import WikiLogo from "./../../assets/images/wikipedia-logo.svg";
import LoadingImage from "./../../assets/images/loading.svg";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: "",
      resultSearch: [],
      lang: "en",
      error: false,
      loading: false,
    };

    this.searchWiki = this.searchWiki.bind(this);
  }

  searchWiki() {
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
              loading: false,
            });
          } else {
            this.setState({ resultSearch: [], error: true, loading: false });
          }
        }
      } catch (e) {
        console.error("API call went wrong.", e);
        this.setState({ resultSearch: [], error: true, loading: false });
      }
    });
  }

  trimText(text) {
    return typeof text === "string" && text.replace(/(<[^>]*>?)|(\\n)/g, "");
  }

  render() {
    const { inputSearch, resultSearch, lang, loading } = this.state;

    return (
      <div className="page-search">
        <div className="page-header">
          <Logo />
          <Select onChange={(value) => this.setState({ lang: value })} />
        </div>
        <Header
          title="WikiSearch"
          subtitle="Search the free encyclopedia"
          search={inputSearch}
          onChange={(value) => this.setState({ inputSearch: value })}
          onClick={() => {
            if (inputSearch !== "") {
              this.setState({ loading: true }, () => this.searchWiki());
            }
          }}
          onKeyUp={() => {
            if (inputSearch !== "") {
              this.setState({ loading: true }, () => this.searchWiki());
            }
          }}
          loading={loading}
        />
        <div className="results-box">
          {loading ? (
            <div>
              <img src={LoadingImage} alt="Loading" />
            </div>
          ) : (
            resultSearch.map((res) => {
              return (
                <Card
                  key={res.pageid}
                  id={res.pageid}
                  title={res.title}
                  pageid={res.pageid}
                  description={this.trimText(res.extract)}
                  imageUrl={res.thumbnail?.source || WikiLogo}
                  lang={lang}
                />
              );
            })
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default SearchPage;

import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./../../components/Header/Header";
import Select from "./../../components/Select/Select";
import Logo from "./../../components/Logo/Logo";
import Card from "./../../components/Card/Card";
import Footer from "./../../components/Footer/Footer";
import ErrorMessage from "./../../components/ErrorMessage/ErrorMessage";

import { fetchWikipedia } from "./../../redux/actions/articlesActions";

import "./Search.page.css";

import WikiLogo from "./../../assets/images/wikipedia-logo.svg";
import LoadingImage from "./../../assets/images/loading.svg";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: "",
      lang: "en",
    };
  }

  trimText(text) {
    return typeof text === "string" && text.replace(/(<[^>]*>?)|(\\n)/g, "");
  }

  render() {
    const { inputSearch, lang } = this.state;
    const { dispatch, loading, articles, errors } = this.props;

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
              dispatch(fetchWikipedia(lang, inputSearch));
            }
          }}
          onKeyUp={() => {
            if (inputSearch !== "") {
              dispatch(fetchWikipedia(lang, inputSearch));
            }
          }}
          loading={loading}
        />
        <div className="results-box">
          {loading ? (
            <div>
              <img src={LoadingImage} alt="Loading" />
            </div>
          ) : errors ? (
            <ErrorMessage
              title="Oops! Something went wrong."
              description="Cannot show data at the moment. Please try again later."
            />
          ) : (
            articles.map((res) => {
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

const mapStateToProps = (state) => ({
  loading: state.articles.loading,
  articles: state.articles.articles,
  errors: state.articles.errors,
});

export default connect(mapStateToProps)(SearchPage);

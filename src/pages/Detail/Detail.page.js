import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Detail.page.css";

import LoadingImage from "./../../assets/images/loading.svg";
import HomeIcon from "./../../assets/images/home.svg";

import Switch from "./../../components/Switch/Switch";
import ErrorMessage from "./../../components/ErrorMessage/ErrorMessage";

const DetailPage = () => {
  const { lang, pageid } = useParams();
  const [resultText, setResultText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const articlesList = useSelector((state) =>
    state.articles.articles.filter(
      (article) => article.pageid !== parseInt(pageid)
    )
  );

  useEffect(() => {
    if (pageid && lang) {
      fetchPageDetail();
    }
  }, [pageid, lang]);

  function DisplayContent() {
    if (loading) {
      return (
        <div className="loading">
          <img src={LoadingImage} alt="Loading" />
          <h4>Loading data</h4>
        </div>
      );
    }

    if (resultText === undefined) {
      return (
        <div className="loading">
          <ErrorMessage
            title="Api call went wrong."
            description="The API call went wrong. Please try again later."
          />
        </div>
      );
    }

    return (
      <div className="page-content">
        <Header />
        {articlesList.length > 0 ? (
          <>
            <h2>Related articles</h2>
            <div className="articles-list">
              {articlesList.map((article) => {
                return (
                  <ArticleSuggestion
                    lang={lang}
                    pageid={article.pageid}
                    title={article.title}
                    onClick={() => setLoading(true)}
                  />
                );
              })}
            </div>
            <hr />
          </>
        ) : (
          ""
        )}
        <h1>{pageTitle}</h1>
        <div className="detail-body">{ReactHtmlParser(resultText)}</div>
      </div>
    );
  }

  async function fetchPageDetail() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    try {
      const res = await fetch(
        `${proxy}https://${lang}.wikipedia.org/w/api.php?action=parse&pageid=${pageid}&format=json&redirects=true&mobileformat=true&disableeditsection=true&disablestylededuplication=true&disablelimitreport=true&prop=displaytitle|subtitle|text|images`
      );
      const data = await res.json();
      const { parse } = data;

      setResultText(parse.text["*"]);
      setPageTitle(parse.title);
    } catch (e) {
      console.error("Something went wrong.", e);
      setResultText(undefined);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="detail--container">
      <DisplayContent />
    </div>
  );
};

const ArticleSuggestion = ({ lang, pageid, title, onClick }) => {
  return (
    <Link
      key={pageid}
      className="articles-box"
      to={`/page/${lang}/${pageid}`}
      onClick={onClick}
    >
      <h4>{title}</h4>
    </Link>
  );
};

const Header = () => {
  return (
    <>
      <div className="header-container">
        <Link className="articles-box" style={{ padding: "10px 20px" }} to="/">
          <img
            src={HomeIcon}
            className="home-icon"
            style={{ marginRight: "10px" }}
            width="20"
            alt="Home icon"
          />
          Home
        </Link>
        <div className="switch-container">
          <h3>Toggle dark mode</h3>
          <Switch />
        </div>
      </div>
      <hr />
    </>
  );
};

export default DetailPage;

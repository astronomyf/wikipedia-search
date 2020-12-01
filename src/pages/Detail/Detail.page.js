import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import "./Detail.page.css";

import LoadingImage from "./../../assets/images/loading.svg";

const DetailPage = () => {
  const { lang, pageid } = useParams();
  const [resultText, setResultText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [loading, setLoading] = useState(true);

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

    if (resultText !== undefined) {
      return (
        <div className="page-content">
          <h1>{pageTitle}</h1>
          <div>{ReactHtmlParser(resultText)}</div>
        </div>
      );
    }

    return (
      <div className="loading">
        <h3>The page id does not exist</h3>
      </div>
    );
  }

  async function fetchPageDetail() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const res = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://${lang}.wikipedia.org/w/api.php?action=parse&pageid=${pageid}&format=json&redirects=true&mobileformat=true&disableeditsection=true&disablestylededuplication=true&disablelimitreport=true&prop=displaytitle|subtitle|text|images`
    );

    try {
      const data = await res.json();
      const { parse } = data;

      setResultText(parse.text["*"]);
      setPageTitle(parse.title);
      setLoading(false);
    } catch (e) {
      console.error("Something went wrong.", e);
      setResultText(undefined);
      setLoading(false);
    }
  }

  return (
    <div className="detail--container">
      <DisplayContent />
    </div>
  );
};

export default DetailPage;

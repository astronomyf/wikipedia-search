import React, { Component } from 'react';

import Header from './../../components/Header/Header';
import Select from './../../components/Select/Select';
import Logo from './../../components/Logo/Logo';
import Card from './../../components/Card/Card';
import Footer from './../../components/Footer/Footer';

import './Search.page.css';

import WikiLogo from './../../assets/images/wikipedia-logo.png';

class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      resultSearch: [],
      lang: 'en',
      error: false,
      disabled: false
    }

    this.searchWiki = this.searchWiki.bind(this);
  }

  searchWiki() {
    this.setState({ resultSearch: [] }, async () => {
      const { inputSearch, lang } = this.state;

      // disable the button
      this.setState({ disabled: true });

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const url = `${proxy}${lang}.wikipedia.org/w/api.php?action=query&exintro=1&prop=extracts|pageimages&pithumbsize=250&format=json&redirect=&origin=*&generator=search&gsrsearch=${inputSearch}`;
    
      const res = await fetch(url);

      if(res.ok) {
        const data = await res.json();
        const { query } = data;

        if(query) {
          const results = Object.values(query.pages);
          this.setState({ resultSearch: results, error: false, disabled: false });

        } else {
          this.setState({ resultSearch: [], error: true, disabled: false });
        }

      } else {
        console.error('API call went wrong.');
        this.setState({ resultSearch: [], error: true, disabled: false });
      }
    });
  }

  trimText(text) {
    return text.replace(/(<[^>]*>?)|(\\n)/g, '');
  }

  render() {
    const { inputSearch, resultSearch, disabled } = this.state;

    return <div className="page-search">
             <div className="page-header">
              <Logo />
              <Select onChange={value => this.setState({ lang: value })} />
             </div>
             <Header
              title="WikiSearch"
              subtitle="Search the free encyclopedia"
              search={inputSearch}
              onChange={value => this.setState({ inputSearch: value })}
              onClick={this.searchWiki}
              disabled={disabled}
             />
             <div className="results-box">
                {resultSearch.map((res) => {
                  return <Card 
                          key={res.pageid}
                          id={res.pageid} 
                          title={res.title} 
                          description={this.trimText(res.extract)} 
                          imageUrl={res.thumbnail?.source || WikiLogo}
                          />
                })}
             </div>
             <Footer />
           </div>;
  }
}

export default SearchPage;

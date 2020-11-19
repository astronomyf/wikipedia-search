import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
   constructor(props) {
      super(props);

      this.state = {
         expanded: false
      }

      this.expandCard = this.expandCard.bind(this);
   }

   expandCard() {
      const { expanded } = this.state;
      this.setState({ expanded: !expanded });
   }

   render() {

      const { title, description, imageUrl, lang } = this.props;
      const { expanded } = this.state;

      return <div className="card card-shadow pop">
               <div className="card-header">
                  <div 
                  className="card-image" 
                  style={{ backgroundImage: `url('${imageUrl}')`}}
                  >
                  </div>
                  <h1>
                     <a href={`https://${lang}.wikipedia.org/wiki/${title}`}>
                        {title}
                     </a>
                  </h1>
               </div>
               <div className={`card-body ${expanded ? 'expanded' : ''}`}>
                  <p>{description}</p>
               </div>
               <div className={`card-overlay ${expanded ? 'fix-overlay' : ''}`} onClick={this.expandCard}>
                  {expanded ? 'Show less' : 'Show more'}
               </div>
            </div>;
   }
}

export default Card;
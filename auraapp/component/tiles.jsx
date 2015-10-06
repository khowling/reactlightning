'use strict;'

import React, {Component} from 'react';
//import { SvgIcon, IconField } from './utils.jsx';
//import DynamicForm from '../services/dynamicForm.es6';

export class Tile extends Component {

    render(){
        let meta = this.props.meta,
            boxclass = "small-box " + 'bg-aqua',
            iclass = "ion " + 'ion-stats-bars';

        return (
          <li className="slds-list__item" style={{maxWidth: "250px"}}>
            <div className="grid-card">

              <div className="slds-grid slds-grid--align-spread">
                <h3 className="site-text-heading--label-weak-large slds-align-middle">{meta.Name}</h3>

              </div>

              <hr className="hr hr--pink"/>
              <p>{meta.Id}</p>
              <div className="slds-button-group">
                <a className="slds-button slds-button--neutral" href="">list</a>
                <a className="slds-button slds-button--neutral" href="">new</a>
              </div>
            </div>
          </li>
        );
    }
}

export class TileList extends Component {
    render () {
        let metaview = this.props.users || [];
        console.log ('TileList render : ' + metaview.length);
        return (
              <ul className="slds-wrap slds-list--horizontal slds-has-cards">
                    {metaview.map(function(row, i) {  return (
                        <Tile key={row.Id} meta={row}/>
                    );})}
              </ul>
        )
    }
}

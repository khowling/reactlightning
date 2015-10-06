'use strict;'

import React, {Component} from 'react';
import {SvgIcon} from './util.jsx';
//import { SvgIcon, IconField } from './utils.jsx';
//import DynamicForm from '../services/dynamicForm.es6';

export class Board extends Component {

  render() {
    let users = this.props.users || [{Name: "keith howling", Title: "Architect", SmallPhotoUrl: "https://gkeith-dev-ed--c.gus.content.force.com/profilephoto/729B00000005A7q/T"}];
    return (
      <ul className="slds-list--custom slds-list--horizontal slds-wrap slds-has-cards slds-wrap">
        { users.map(u => { return (
        <li className="slds-list__item" style={{width: "250px"}}>
          <div className="slds-media slds-tile">
            <div className="slds-media__figure">
              <span className="slds-avatar slds-avatar--circle slds-avatar--small">
                <img src={u.SmallPhotoUrl} alt="" />
              </span>
            </div>
            <div className="slds-media__body">
              <div className="slds-grid slds-grid--align-spread slds-has-flexi-truncate">
                <div>
                  <p className="slds-tile__title slds-truncate"><a href="#">{u.Name}</a></p>
                  <ul className="slds-tile__detail slds-list--horizo ntal slds-has-dividers slds-text-body--small">
                    <li className="slds-truncate slds-list__item">{u.Title}</li>
                    <li className="slds-truncate slds-list__item">{u.Division}</li>
                    <br/>
                    <li className="slds-truncate slds-list__item"><p>Position since: May, 2015</p></li>
                  </ul>
                </div>
                <div className="slds-dropdown-trigger">
                  <button className="slds-button slds-button--icon-border-filled" aria-haspopup="true">
                    <SvgIcon  classOverride="slds-button__icon" spriteType="utility" spriteName="down" small={true}/>
                    <span className="slds-assistive-text">Show More</span>
                  </button>
                  <div className="slds-dropdown slds-dropdown--left slds-dropdown--actions slds-dropdown--menu">
                    <ul className="slds-dropdown__list" role="menu">
                      <li id="menu-13-0" href="#" className="slds-dropdown__item"><a href="#" className="slds-truncate" role="menuitem">Position Change</a></li>
                      <li id="menu-14-1" href="#" className="slds-dropdown__item"><a href="#" className="slds-truncate" role="menuitem">Termination</a></li>
                      <li id="menu-15-2" href="#" className="slds-dropdown__item"><a href="#" className="slds-truncate" role="menuitem">Promotion</a></li>
                    </ul>
                  </div>
                </div>
                <span className="slds-icon__container slds-tile--board__icon">
                  <SvgIcon classOverride="slds-icon slds-icon-text-warning" spriteType="utility" spriteName="warning" small={true}/>
                  <span className="slds-assistive-text">Warning Icon</span>
                </span>
              </div>
            </div>
          </div>
        </li>
      )})}
        <li className="slds-list__item" style={{width: "250px"}}>
            <div className="slds-media slds-tile">
                <div className="slds-media__body">
                  <div className="slds-grid slds-grid--align-spread slds-has-flexi-truncate">
                  <div className="slds-dropdown-trigger">
                    <button className="slds-button slds-button--icon-border-filled" aria-haspopup="true">
                      <SvgIcon  classOverride="slds-button__icon" spriteType="utility" spriteName="down" small={true}/>
                      <span className="slds-assistive-text">Show More</span>
                    </button>
                    <div className="slds-dropdown slds-dropdown--left slds-dropdown--actions slds-dropdown--menu">
                      <ul className="slds-dropdown__list" role="menu">
                        <li id="menu-13-0" href="#" className="slds-dropdown__item"><a href="#" className="slds-truncate" role="menuitem">New Position</a></li>

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </li>
      </ul>
    )
  }
}

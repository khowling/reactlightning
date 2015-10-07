'use strict;'

import React, {Component} from 'react';
import {SvgIcon} from './util.jsx';

export class Modal extends Component {
  render() {
    return (
    <div>
      <div aria-hidden="false" role="dialog" className="slds-modal--large slds-modal slds-fade-in-open">
        <div className="slds-modal__container"  style={{width: "95%"}}>
            {this.props.children}
        </div>
      </div>
      <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>
    </div>
    );
  }
}

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {openFlow: false};
  }
  _navToForce(navProp) {
    if (this.props.auraAtts[navProp]) {
      let createRecordEvent = this.props.A.get("e.force:createRecord");
      createRecordEvent.setParams({
        "entityApiName": this.props.auraAtts[navProp]
      });
      createRecordEvent.fire();
    } else {
      alert ("No Request Type Specified, check Component Properties");
    }
  }
  _flowModal(flow) {
    this.setState({openFlow: flow});
  }

  _navToUser(userId) {
    let navEvt = this.props.A.get("e.force:navigateToURL"); // "e.force:navigateToSObject");
    navEvt.setParams({
      "url": "profile/"+userId,
  //    "recordId": userId,
  //    "slideDevName": "detail"
    });
    navEvt.fire();

    // onClick={this._navToUser.bind(this, u.Id)}
  }

  render() {
    let self = this,
        users = this.props.users || [{Name: "keith howling", Title: "Architect", SmallPhotoUrl: "https://gkeith-dev-ed--c.gus.content.force.com/profilephoto/729B00000005A7q/T"}];
    return (
    <span>
      <ul className="slds-list--custom slds-list--horizontal slds-wrap slds-has-cards slds-wrap">
        { users.map(u => { if (!u.Name.endsWith('*')) return (
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
                  <p className="slds-tile__title slds-truncate"><a href={"profile/"+u.Id}>{u.Name.substring(0,22)}</a></p>
                  <ul className="slds-tile__detail slds-list--horizo ntal slds-has-dividers slds-text-body--small">
                    <li className="slds-truncate slds-list__item">{u.Title}</li>
                    <li className="slds-truncate slds-list__item">{u.Division}</li>
                    <br/>
                    <li className="slds-truncate slds-list__item"><p>Position since: May, 2015</p></li>
                  </ul>
                </div>
                <div className="slds-dropdown-trigger">
                  <button className="slds-button slds-button--icon-border-filled" aria-haspopup="true">
                    <SvgIcon  baseUrl={self.props.auraAtts.sldsUrl} classOverride="slds-button__icon" spriteType="utility" spriteName="down" small={true}/>
                    <span className="slds-assistive-text">Show More</span>
                  </button>
                  <div className="slds-dropdown slds-dropdown--left slds-dropdown--actions slds-dropdown--menu">
                    <ul className="slds-dropdown__list" role="menu">
                      <li id="menu-13-0" href="#" className="slds-dropdown__item"><a onClick={self._navToForce.bind(self, "termination")} className="slds-truncate" role="menuitem">Termination</a></li>
                      <li id="menu-14-1" href="#" className="slds-dropdown__item"><a onClick={self._navToForce.bind(self, "positionchange")} className="slds-truncate" role="menuitem">Position Change</a></li>
                      <li id="menu-15-2" href="#" className="slds-dropdown__item"><a onClick={self._navToForce.bind(self, "leaverequest")} className="slds-truncate" role="menuitem">Leave Request</a></li>
                    </ul>
                  </div>
                </div>
                { u.SmallPhotoUrl === "/sfsites/c/profilephoto/005/T" &&
                <span className="slds-icon__container slds-tile--board__icon">
                  <SvgIcon baseUrl={self.props.auraAtts.sldsUrl} classOverride="slds-icon slds-icon-text-warning" spriteType="utility" spriteName="warning" small={true}/>
                  <span className="slds-assistive-text">Warning Icon</span>
                </span>
                }
              </div>
            </div>
          </div>
        </li>
      )})}
        <li className="slds-list__item" style={{width: "250px"}}>
            <div className="slds-media slds-tile">
                <div className="slds-media__body">
                  <button className="slds-button slds-button--neutral" onClick={self._flowModal.bind(self, "newposition")}>New Position</button>
              </div>
            </div>
        </li>
      </ul>
      { this.state.openFlow &&
        <Modal>
          <div className="slds-modal__container">
            <div className="slds-modal__header">
             <h2 className="slds-text-heading--medium">New Position Request</h2>
             <button className="slds-button slds-modal__close" onClick={self._flowModal.bind(self, null)}>
               <SvgIcon baseUrl={self.props.auraAtts.sldsUrl} classOverride="slds-button__icon slds-button__icon--inverse slds-button__icon--large" spriteType="action" spriteName="close"/>
               <span className="slds-assistive-text">Close</span>
             </button>
           </div>

            <div className="slds-modal__content" style={{padding: "0.5em", minHeight: "400px"}}>
              <iframe src="https://abihrpoc.my.salesforce.com/apex/positionflow" style={{height: "600px", width: "100%"}}/>
            </div>
            <div className="slds-modal__footer"></div>
          </div>
        </Modal>
      }
    </span>
    )
  }
}

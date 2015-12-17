'use strict;'

import React, {Component} from 'react';
import AuraService from '../services/auraservice.es6';
import {SvgIcon} from './util.jsx';

export class Modal extends Component {

  _modalAction(param) {
    this.props.closeFn(param);
  }
  render() {
    return (
    <div>
      <div className="slds-modal--large slds-modal slds-fade-in-open">
        <div className="slds-modal__container"  style={{width: "95%"}}>
          <div className="slds-modal__container">
            <div className="slds-modal__header">
             <h2 className="slds-text-heading--medium" style={{float: "left"}}>{this.props.title}</h2>
             <button className="slds-button slds-button--brand" style={{float: "right"}} onClick={this._modalAction.bind(this, "go")}>Go to Request</button>
             <button className="slds-button slds-modal__close" onClick={this._modalAction.bind(this, null)}>
               <SvgIcon classOverride="slds-button__icon slds-button__icon--inverse slds-button__icon--large" spriteType="action" spriteName="close"/>
               <span className="slds-assistive-text">Close</span>
             </button>
           </div>
            <div className="slds-modal__content" style={{padding: "0.5em", minHeight: "400px"}}>
              <iframe src={this.props.pageURL} style={{height: "600px", width: "100%"}}/>
            </div>
            <div className="slds-modal__footer"></div>
          </div>
        </div>
      </div>
      <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>
    </div>
    );
  }
}

export class Employee extends Component {

  _navToForce(navProp) {
    let aura = AuraService.instance;
    let navObject = aura.getAttr(navProp);
    if (navObject)
      aura.fireEvent ("e.force:createRecord",{ "entityApiName": navObject});
    else
      alert ("No Request Type Specified, check Component Properties");
  }
  _getLabel(prop) {
    let aura = AuraService.instance;
    return aura.getAttr(prop);
  }

  _employeeAction (aruaattr, title) {
    this.props.employeeAction(aruaattr, title, this.props.user);
  }

  render() {
    let u = this.props.user;
    return (
      <div className="slds-pill" style={{width: "100%", lineHeight: "inherit"}}>

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
                <button className="slds-button slds-button--icon-border-filled" style={{marginLeft: "0"}}  aria-haspopup="true">
                  <SvgIcon classOverride="slds-button__icon" spriteType="utility" spriteName="down" small={true}/>
                  <span className="slds-assistive-text">Show More</span>
                </button>
                <div className="slds-dropdown slds-dropdown--left slds-dropdown--actions slds-dropdown--menu">
                  <ul className="slds-dropdown__list" role="menu">
                    <li id="menu-13-0" href="#" className="slds-dropdown__item"><a onClick={this._navToForce.bind(this, "menu1obj")} className="slds-truncate" role="menuitem">{this._getLabel('menu1label')}</a></li>
              { /*      <li id="menu-14-1" href="#" className="slds-dropdown__item"><a onClick={this._employeeAction.bind(this, "assignment", "Assignment Change")} className="slds-truncate" role="menuitem">Assignment Change</a></li> */ }
                    <li id="menu-15-2" href="#" className="slds-dropdown__item"><a onClick={this._navToForce.bind(this, "menu2obj")} className="slds-truncate" role="menuitem">{this._getLabel('menu2label')}</a></li>
                  </ul>
                </div>
              </div>
              { this.props.alert &&
              <span className="slds-icon__container slds-tile--board__icon">
                <SvgIcon classOverride="slds-icon slds-icon-text-warning" spriteType="utility" spriteName="warning" small={true}/>
                <span className="slds-assistive-text">Warning Icon</span>
              </span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class PositionTile extends Component {
  render() {
    return (
      <li className="slds-list__item" style={{width: "260px"}}>
        <div className="slds-tile slds-tile--board">
          <p className="slds-tile__title slds-truncate" style={{marginLeft: "8px", marginBottom: "8px"}} >
            {this.props.title}
          </p>
          {this.props.children}
        </div>
      </li>
    );
  }
}

export class EmployeeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], openFlow: false};
  }
  _navToForce(navProp) {
    let aura = AuraService.instance;
    let navObject = aura.getAttr(navProp);
    if (navObject)
      aura.fireEvent ("e.force:createRecord",{ "entityApiName": navObject});
    else
      alert ("No Request Type Specified, check Component Properties");
  }
  _navToNewPositionList(navProp) {
    let aura = AuraService.instance;
    let navObject = aura.getAttr(navProp);
    if (navObject)
      aura.fireEvent ("e.force:navigateToList",{ "scope": "ABI_Position__c", "listViewId": navObject});
    else
      alert ("No Request Type Specified, check Component Properties");
  }

  _openModal(navProp, title, user) {
    let aura = AuraService.instance;
    this.setState({openFlow: true, title: title, pageURL:  aura.getAttr(navProp) + user.Id.substr(0,15)});
  }
  _closeModal(gotopass) {
    let aura = AuraService.instance;
    this.setState({openFlow: false}, () => {
      if (gotopass) {
        let navObject = aura.getAttr("assignmentobj");
        if (navObject)
          aura.fireEvent ("e.force:navigateToList",{ "scope": navObject, "listViewId": "00BB0000001Y93G"});
        else
          alert ("No Request Type Specified, check Component Properties");
        }
    });
  }

  componentWillMount () {
    let aura = AuraService.instance;
    if (aura.enabled) {
      aura.callApex("getTeam").then(succval => {
        console.log (`got results ${succval.length}`);
        this.setState({users: succval});
      }, e =>  { console.log ('reject error ' + e)}).catch(e => { console.log ('catch error ' + e)})
    } else
      this.setState({users: this.props.testData});
  }

  render() {
    let users = this.state.users;
    return (
      <span>
        <ul className="slds-list--custom slds-list--horizontal slds-wrap slds-has-cards slds-wrap">
          { users.map(u => { if (!u.Name.endsWith('*')) {
            return (
              <PositionTile key={u.Id} title={u.Title}>
                <Employee user={u} alert={false} employeeAction={this._openModal.bind(this)}/>
              </PositionTile>
            );
          }})}
          <PositionTile key="new" title="[new position]">
            <button className="slds-button slds-button--inverse" style={{color: "white", width: "100%"}} onClick={this._navToForce.bind(this, "positionobj")}>Create</button>
          </PositionTile>
        </ul>

        { this.state.openFlow &&
            <Modal title={this.state.title} pageURL={this.state.pageURL} closeFn={this._closeModal.bind(this)}/>
        }
      </span>
    )
  }
}
EmployeeBoard.propTypes = {  testData: React.PropTypes.array };
EmployeeBoard.defaultProps = {  testData: [
  {"Department":"IT","SmallPhotoUrl":"https://sdodemo-main-14f0402cabc-15003d9ea44.force.com/abiess/profilephoto/729B00000006moD/T","Title":"SVP, Technology","Id":"005B0000001eOsJIAU","Name":"Lauren DO NOT USE -Boyle*","sobjectType":"User"},
  {"SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moe/T","Title":"EVP Business Development","Id":"005B0000001eOu4IAE","Name":"Larry Baxter","sobjectType":"User"},
  {"SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moG/T","Title":"VP of Sales","Id":"005B0000001eOsOIAU","Name":"James Wu","sobjectType":"User"},
  {"Department":"C-Level","SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moO/T","Title":"Chief Executive Officer","Id":"005B0000001eOslIAE","Name":"Mark Metz","sobjectType":"User"}]
};

'use strict;'

import React, {Component} from 'react';
import AuraService from '../services/auraservice.es6';
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

class Employee extends Component {
  _navToForce(navProp) {
    let aura = AuraService.instance;
    let navObject = aura.getAttr(navProp);
    if (navObject)
      aura.fireEvent ("e.force:createRecord",{ "entityApiName": navObject});
    else
      alert ("No Request Type Specified, check Component Properties");
  }

  render() {
    let u = this.props.user;
    return (
      <div className="slds-pill" style={{width: "100%", lineHeight: "inherit", marginTop: "10px" }}>
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
                <SvgIcon classOverride="slds-button__icon" spriteType="utility" spriteName="down" small={true}/>
                <span className="slds-assistive-text">Show More</span>
              </button>
              <div className="slds-dropdown slds-dropdown--left slds-dropdown--actions slds-dropdown--menu">
                <ul className="slds-dropdown__list" role="menu">
                  <li id="menu-13-0" href="#" className="slds-dropdown__item"><a onClick={this._navToForce.bind(this, "termination")} className="slds-truncate" role="menuitem">Termination</a></li>
                  <li id="menu-14-1" href="#" className="slds-dropdown__item"><a onClick={this._navToForce.bind(this, "positionchange")} className="slds-truncate" role="menuitem">Position Change</a></li>
                  <li id="menu-15-2" href="#" className="slds-dropdown__item"><a onClick={this._navToForce.bind(this, "leaverequest")} className="slds-truncate" role="menuitem">Leave Request</a></li>
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

class PositionTile extends Component {
  render() {
    return (
      <li className="slds-list__item" style={{width: "280px"}}>
        <div className="slds-tile slds-tile--board">
          <p className="slds-tile__title slds-truncate">{this.props.title}</p>
          {this.props.children}
        </div>
      </li>
    );
  }
}

export class EmployeeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {openFlow: false};
  }

  _flowModal(flow) {
    this.setState({openFlow: flow});
  }

  componentWillMount () {
    console.log ('EmployeeBoard componentWillMount');
    let arua = AuraService.instance;
    if (arua.enabled) {
      console.log ("Calling getTeam111");
      aura.callApex("getTeam").then(succval => {
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
              <Employee user={u} alert={false}/>
            </PositionTile>
          );
        }})}
        <PositionTile key="new" title="[new position]">
          <button className="slds-button slds-button--neutral" style={{width: "100%"}} onClick={this._flowModal.bind(this, "newposition")}>Create</button>
        </PositionTile>
      </ul>

      { this.state.openFlow &&
        <Modal>
          <div className="slds-modal__container">
            <div className="slds-modal__header">
             <h2 className="slds-text-heading--medium">New Position Request</h2>
             <button className="slds-button slds-modal__close" onClick={this._flowModal.bind(this, null)}>
               <SvgIcon classOverride="slds-button__icon slds-button__icon--inverse slds-button__icon--large" spriteType="action" spriteName="close"/>
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
EmployeeBoard.propTypes = {  testData: React.PropTypes.array };
EmployeeBoard.defaultProps = {  testData: [
  {"Department":"IT","SmallPhotoUrl":"https://sdodemo-main-14f0402cabc-15003d9ea44.force.com/abiess/profilephoto/729B00000006moD/T","Title":"SVP, Technology","Id":"005B0000001eOsJIAU","Name":"Lauren DO NOT USE -Boyle*","sobjectType":"User"},
  {"SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moe/T","Title":"EVP Business Development","Id":"005B0000001eOu4IAE","Name":"Larry Baxter","sobjectType":"User"},
  {"SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moG/T","Title":"VP of Sales","Id":"005B0000001eOsOIAU","Name":"James Wu","sobjectType":"User"},
  {"Department":"C-Level","SmallPhotoUrl":"https://abihrpoc--c.gus.content.force.com/profilephoto/729B00000006moO/T","Title":"Chief Executive Officer","Id":"005B0000001eOslIAE","Name":"Mark Metz","sobjectType":"User"}]
};

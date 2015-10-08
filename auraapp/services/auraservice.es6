'use strict';

let instance = null;
export default class AuraService {

  constructor (component, A, ltngRequireSLDSUrl) {
    if (instance) {
      throw "AuraService() only allow to construct once";
    }
    this._auraComponent = component;
    this._auraA = A;
    this._SLDSUrl = ltngRequireSLDSUrl;
    instance = this;
  }

  static get instance() {
    if (!instance) throw "AuraService() need to construct first";
    return instance;
  }

  get enabled() { return (this._auraComponent != null); }
  /* Salesforce Lightning Design System URL (for SVG Icons) */
  get SLDSUrl() { return this._SLDSUrl; }

  /* get Aura Compoment Attribute */
  getAttr(attr) {
    if (this._auraComponent)
      return this._auraComponent.get(`v.${attr}`);
  }

  /* fire Aura event */
  fireEvent(event, params) {
    let evnt = this._auraA.get(event);
    evnt.setParams(params);
    evnt.fire()
  }

  /* fire Aura event */
  callApex(auraEnabledMethod) {
    console.log(`callApex`);
    return new Promise( (resolve, reject) => {
      console.log(`AuraService callApex method ${auraEnabledMethod} ${this._auraComponent}`);
      let actionMethod = this._auraComponent.get(`c.${auraEnabledMethod}`);
      console.log(`AuraService callApex method ${actionMethod}`);
      actionMethod.setCallback(this, (actionResult) => {
        console.log (`callApex results: ${JSON.stringify(actionResult.getReturnValue())}`);
        resolve(actionResult.getReturnValue());
      });
      //Enque the action
      this._auraA.enqueueAction(actionMethod);
    });
  }
}
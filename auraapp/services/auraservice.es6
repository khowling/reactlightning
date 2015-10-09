'use strict';

let instance = null;
export default class AuraService {

  constructor (component, A, ltngRequireSLDSUrl) {
    if (instance) {
      console.log ("AuraService() only allow to construct once");
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
    return new Promise( (resolve, reject) => {
      let actionMethod = this._auraComponent.get(`c.${auraEnabledMethod}`);
      actionMethod.setCallback(this, (actionResult) => {
        return resolve(actionResult.getReturnValue());
      });
      //Enque the action
      this._auraA.enqueueAction(actionMethod);
    });
  }
}

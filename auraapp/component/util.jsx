
import React, {Component} from 'react';
import AuraService from '../services/auraservice.es6';

export  class SvgIcon extends Component {
  render() {
    let SLDSUrl = AuraService.instance.SLDSUrl;
    return (
        <svg className={(this.props.classOverride  || "") + ((this.props.spriteType === "utility" && !this.props.classOverride) && " icon-utility "  ||  "  ")  + (this.props.small && "slds-icon--small" || "") + (this.props.large && "slds-icon--large" || "") + (this.props.classOverride  && " " || (" slds-icon-" + this.props.spriteType+ "-" +this.props.spriteName.replace(/_/g,"-")))}
          dangerouslySetInnerHTML={{__html: "<use xlink:href='"+SLDSUrl+"/assets/icons/"+this.props.spriteType+"-sprite/svg/symbols.svg#"+this.props.spriteName+"' />"}}>
        </svg>
  )}
}
SvgIcon.propTypes = { spriteType: React.PropTypes.string.isRequired, spriteName: React.PropTypes.string.isRequired, small: React.PropTypes.bool, large: React.PropTypes.bool  };
SvgIcon.defaultProps = { spriteType: "", spriteName: "", small: false, large: false };

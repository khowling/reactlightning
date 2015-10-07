'use strict;'
import React, {Component} from 'react';
import {Board} from './component/board.jsx';

export default class App extends Component {

   constructor (props) {
    super(props);
    console.log (`App constructor, aura atts:  ${props.auraAtts}`);
    this.state = {users: []};
   }

   componentWillMount () {
     console.log ('App componentWillMount');
     if (this.props.component && this.props.A) {
       var action = this.props.component.get("c.getTeam");
       action.setCallback(this, (actionResult) => {
         //Reset the value of the component list attribute with the records returned
         console.log (`App componentWillMount gotit: ${JSON.stringify(actionResult.getReturnValue())}`);
         this.setState({users: actionResult.getReturnValue()});
       });
       //Enque the action
      this.props.A.enqueueAction(action);
    } else {
       this.setState({users: [{Name: "keith"}]});
    }
   }

   render() {
     return (
             <Board A={this.props.A} auraAtts={this.props.auraAtts}  users={this.state.users}/>
           );
   }
 }
 App.propTypes = {
  auraAtts: React.PropTypes.shape({
    newposition: React.PropTypes.string,
    termination: React.PropTypes.array,
    sldsUrl: React.PropTypes.string.isRequired
  })
};
App.defaultProps = { auraAtts: { sldsUrl: "/SLDS092"}};

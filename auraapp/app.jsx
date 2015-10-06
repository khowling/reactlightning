'use strict;'
import React, {Component} from 'react';
import {TileList} from './component/tiles.jsx';
import {Board} from './component/board.jsx';

export default class App extends Component {

   constructor (props) {
    super(props);
    console.log (`App constructor ${props.name}`);
    this.state = {users: []};
   }

   componentWillMount () {
     console.log ('App componentWillMount');
     var action = this.props.getUser || { setCallback: (x,y) => { y({getReturnValue: () => [{Name: "keith"}]})}};
     action.setCallback(this, (actionResult) => {
       //Reset the value of the component list attribute with the records returned
       console.log (`App componentWillMount gotit: ${JSON.stringify(actionResult.getReturnValue())}`);
       this.setState({users: actionResult.getReturnValue()});
     });
     //Enque the action
     if (this.props.A)
      this.props.A.enqueueAction(action);
   }

   render() {
     return (<div>KeithDebug1: {this.props.name}
             <Board users={this.state.users}/>
           </div>);
   }
 }

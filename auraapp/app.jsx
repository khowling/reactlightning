'use strict;'
import React, {Component} from 'react';
import AuraService from './services/auraservice.es6';
import {EmployeeBoard} from './component/board.jsx';

export default class App extends Component {

   constructor (props) {
    super(props);
    this.auraService = new AuraService(props.component,  props.auraAction, props.sldsUrl);
   }

   render() {
     return <EmployeeBoard/>
   }
 }
App.propTypes = {
   auraAction: React.PropTypes.object,
   component: React.PropTypes.object,
   sldsUrl: React.PropTypes.string
};
App.defaultProps = {  sldsUrl: ""};

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import Dashboard  from './components/Dashboard'


// create a component
class app extends Component {
    render() {
        console.disableYellowBox = true
        return (
            <Dashboard/>
        );
    }
}


export default app;

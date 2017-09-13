//import liraries
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import  Constant  from '../common/Constant'

var {height, width} = Dimensions.get('window');


// create a component
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageHeight:height,
            pageWidth:width,
            isSlow: false,
            isHip: false,
            isPop: true,
        };
    }
    componentWillMount() {
        StatusBar.setHidden(true)
    }
    _onLayout = event => {
        this.setState({
            pageHeight:event.nativeEvent.layout.height,
            pageWidth:event.nativeEvent.layout.width,
        });
    }
    render() {
        
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <View style = {styles.mainView}>
                    <Image source = {require('../assets/logo-radio.jpg')} style = {styles.logoImg}/>
                    <Image source = {require('../assets/music.png')} style = {styles.musicImg}/>
                    <View style = {{flexDirection:'row', marginTop: 30}}>
                        <Image source = {require('../assets/play.png')} style = {styles.startImg}></Image>
                        <View style = {{marginLeft: 20}}>
                            <Text style = {{color:'white', fontSize: 15}}>10 Hands</Text>
                            <Text style = {{color:'white', fontSize: 13}}>Jor'dan Armstrong</Text>
                            <Text style = {{color:'gray', fontSize: 11}}>RnB Soul</Text>
                        </View>
                    </View>
                </View>

                <View style = {[styles.tabView, { width: this.state.pageWidth }]}>
                    <TouchableWithoutFeedback>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3}]}>
                            <Text style = {styles.tab1_name}>Slow Jams</Text>
                            {this.state.isSlow?
                                <View style = { [styles.line, {width: this.state.pageWidth/3}]}/> :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3}]}>
                            <Text style = {styles.tab1_name}>Hip Hop</Text>
                            {this.state.isHip?
                                <View style = { [styles.line, {width: this.state.pageWidth/3}]}/> :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3}]}>
                            <Text style = {styles.tab1_name}>Pop Music</Text>
                            {this.state.isPop?
                                <View style = { [styles.line, {width: this.state.pageWidth/3}]}/> :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    mainView: {
        alignItems: 'center'
    },
    tabView: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: Constant.TAP_COLOR,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    tab1: {
        // backgroundColor: '#460607',
        alignItems:'center',
        justifyContent: 'center',
        height: 50,
    },
    tab1_name: {
        color: 'white',
        fontSize: 18
    },
    line: {
        height: 6,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    logoImg: {
        width: width/4,
        height: 200,
        resizeMode: 'contain'
    },
    musicImg: {
        width: width/4,
        height: width/4,
        resizeMode: 'cover'
    },
    startImg: {
        width: width/8,
        height: width/8,
    }
});

//make this component available to the app
export default Dashboard;

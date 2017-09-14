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
var isPlay = false

// create a component
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageHeight:height,
            pageWidth:width,
            isSlow: true,
            isHip: false,
            isPop: false,
            isPlay: false,
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
    onShow = () => {
        this.setState({
            isSlow: true,
            isHip: false,
            isPop: false
        })
    }
    onHip = () => {
        this.setState({
            isSlow: false,
            isHip: true,
            isPop: false
        })
    }
    onPop = () => {
        this.setState({
            isSlow: false,
            isHip: false,
            isPop: true
        })
    }
    onPressPlay = () => {
        isPlay =! isPlay
        this.setState({ isPlay: isPlay })
    }
    showPlayButton(){
        return(
            <TouchableWithoutFeedback onPress = {this.onPressPlay}>
                <Image source = {this.state.isPlay? require('../assets/play.png'):require('../assets/stop.png')} style = {styles.startImg}></Image>
            </TouchableWithoutFeedback>
        )
    }
    showSongInfo(){
        if(this.state.pageWidth < 600){
            return(
                <View style = {{alignItems:'center', marginTop: 50}}>
                    <Image source = {require('../assets/music.png')} style = {styles.musicImg}/>
                    <View style = {{flexDirection:'row', marginTop: 30, alignItems:'center'}}>
                        {this.showPlayButton()}
                        <View style = {{marginLeft: 20}}>
                            <Text style = {styles.songtitle}>10 Hands</Text>
                            <Text style = {styles.artist}>Jor'dan Armstrong</Text>
                            <Text style = {styles.playlisttitle}>RnB Soul</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Image source = {require('../assets/music.png')} style = {[styles.musicImg]}/>
                    <View style = {{flexDirection:'row', marginLeft: 20}}>
                        {this.showPlayButton()}
                        <View style = {{marginLeft: 20, justifyContent:'center'}}>
                            <Text style = {styles.songtitle}>10 Hands</Text>
                            <Text style = {styles.artist}>Jor'dan Armstrong</Text>
                            <Text style = {styles.playlisttitle}>RnB Soul</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    render() {        
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <View style = {styles.mainView}>
                    <Image source = {require('../assets/logo-radio.jpg')} style = {styles.logoImg}/>
                    {this.showSongInfo()}
                    <Text style = {[styles.genre, {width: this.state.pageWidth}]}>Choose your genre:</Text>
                    
                </View>

                <View style = {[styles.tabView, { width: this.state.pageWidth }]}>
                    <TouchableWithoutFeedback onPress = {this.onShow}>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3}, this.state.isSlow?{backgroundColor: '#460607'}:{backgroundColor: 'transparent'}]}>
                            <Text style = {styles.tab1_name}>Slow Jams</Text>
                            {this.state.isSlow?
                                <View style = { [styles.line, {width: this.state.pageWidth/3}]}/> :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress = {this.onHip}>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3},this.state.isHip?{backgroundColor: '#460607'}:{backgroundColor: 'transparent'}]}>
                            <Text style = {styles.tab1_name}>Hip Hop</Text>
                            {this.state.isHip?
                                <View style = { [styles.line, {width: this.state.pageWidth/3}]}/> :
                                null
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress = {this.onPop}>
                        <View style = {[styles.tab1, {width: this.state.pageWidth/3},this.state.isPop?{backgroundColor: '#460607'}:{backgroundColor: 'transparent'}]}>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
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
        alignItems:'center',
        justifyContent: 'center',
        height: 50,
    },
    tab1_name: {
        color: 'white',
        fontSize: 17
    },
    line: {
        height: 5,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    logoImg: {
        width: width/4,
        height: 100,
        resizeMode: 'contain'
    },
    musicImg: {
        width: width/4,
        height: width/4,
        resizeMode: 'cover'
    },
    startImg: {
        width: width/6,
        height: width/6,
    },
    songtitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    artist: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    playlisttitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    genre:{
        color: 'white',
        fontSize: 17,
        marginBottom: 60,
        textAlign: 'left',
        paddingLeft: 15
    }
});

//make this component available to the app
export default Dashboard;
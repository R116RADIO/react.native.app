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
import Constant  from '../common/Constant'
import Orientation from 'react-native-orientation';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import styles from './Styles'

var {height, width} = Dimensions.get('window');
var isPlay = false
var timer ;
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
            selectedMusicSource: '',
            song_title: '',
            artist: '',
            playlist_title: '',
            album: '',
            imageURL: '',
            songID: Number,
            isPortrait: true
        };
    }
    componentWillMount() {
        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.setState({ isPortrait: true })
        } else {
            this.setState({ isPortrait: false })
        }
        StatusBar.setHidden(true)
        this.loadData1('http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get')
        
    }
    componentwill
    loadData1(JsonURL){
        fetch(JsonURL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
            else{
                this.setState({
                    playlist_title: responseData.data[0].title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
        }).catch((e) => {
            console.log(e)
        })   
    }

    loadData(JsonURL){
        fetch(JsonURL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            ReactNativeAudioStreaming.play(responseData.data[0].tuneinurl + '.mp3', {showIniOSMediaCenter: true, showInAndroidNotifications: true});
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
            else{
                this.setState({
                    playlist_title: responseData.data[0].title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
        }).catch((e) => {
            console.log(e)
        })   
    }

    loadChangedArtInfo(URL){
        fetch(URL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
            else{
                this.setState({
                    playlist_title: responseData.data[0].title,
                    album: responseData.data[0].track.album,
                    song_title: responseData.data[0].track.title,
                    artist: responseData.data[0].track.artist,
                    imageURL: responseData.data[0].track.imageurl,
                    selectedMusicSource: responseData.data[0].tuneinurl + '.mp3',
                    songID: responseData.data[0].track.id,
                })
            }
        }).catch((e) => {
            console.log(e)
        })   
    }
    _onLayout = event => {
        this.setState({
            pageHeight:event.nativeEvent.layout.height,
            pageWidth:event.nativeEvent.layout.width,
        });
    }  
    onSlow = () => {
        clearInterval(timer); 
        
        if(!this.state.isPlay){
            isPlay = true
        }
        ReactNativeAudioStreaming.pause()
        timer = setInterval(() => {
            this.loadChangedArtInfo(Constant.SLOW_JAMES_URL);
        }, 15000);
        this.loadData(Constant.SLOW_JAMES_URL);
        this.setState({
            isSlow: true,
            isHip: false,
            isPop: false,
            isPlay: true,
        })
    }
    onHip = () => {
        clearInterval(timer); 
        
        if(!this.state.isPlay){
            isPlay = true
        }
        ReactNativeAudioStreaming.pause()
        timer = setInterval(() => {
            this.loadChangedArtInfo(Constant.HIP_HOP_URL);
        }, 15000);
        this.loadData(Constant.HIP_HOP_URL);
        this.setState({
            isSlow: false,
            isHip: true,
            isPop: false,
            isPlay: true,
        })
    }
    onPop = () => {
        clearInterval(timer); 
        
        if(!this.state.isPlay){
            isPlay = true
        }
        ReactNativeAudioStreaming.pause()
        timer = setInterval(() => {
            this.loadChangedArtInfo(Constant.POP_MUSIC_URL);
        }, 15000);
        this.loadData(Constant.POP_MUSIC_URL);
        this.setState({
            isSlow: false,
            isHip: false,
            isPop: true,
            isPlay: true,
        })
    }
    onPressPlay = () => {
        isPlay =! isPlay
        this.setState({ isPlay: isPlay })
        if(isPlay){
            ReactNativeAudioStreaming.play(this.state.selectedMusicSource, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
            if(this.state.isSlow){
                timer = setInterval(() => {
                    this.loadChangedArtInfo(Constant.SLOW_JAMES_URL);
                }, 15000);
            }
            if(this.state.isHip){
                timer = setInterval(() => {
                    this.loadChangedArtInfo(Constant.HIP_HOP_URL);
                }, 15000);
            }
            if(this.state.isPop){
                timer = setInterval(() => {
                    this.loadChangedArtInfo(Constant.POP_MUSIC_URL);
                }, 15000);
            }
        }else{
            clearInterval(timer); 
            ReactNativeAudioStreaming.pause()
        }

    }
    showPlayButton(){
        return(
            <TouchableWithoutFeedback onPress = {this.onPressPlay}>
                <Image source = {this.state.isPlay? 
                    require('../assets/stop.png'):
                    require('../assets/play.png')} 
                    style = {this.state.isPortrait? styles.startPortImg: [styles.startPortImg, {width: height/6, height: height/6}]}
                />
            </TouchableWithoutFeedback>
        )
    }

    showMusicImage(){
        var str = this.state.imageURL
        var title=str.substring(str.lastIndexOf("/")+1,str.lastIndexOf(".png"));
        if(title == 'nocover'){
            return(
                <View
                    style={this.state.isPortrait?[styles.musicImg, styles.placeholderText]:[styles.musicImg, styles.placeholderText, {width: height*0.3, height: height*0.3}]}
                >
                    <Text style = {{fontSize: 14, fontWeight:'bold'}} >{this.state.album}</Text>
                </View>
            )
        }else{
            return(
                <Image 
                    source={{uri: this.state.imageURL}}
                    style={this.state.isPortrait?styles.musicImg:[styles.musicImg, {width: height*0.3, height: height*0.3}]}
                    defaultSource = {require('../assets/placeholder.jpg')}
                />
            )
        }
    }
    showSongInfo(){
        const initial = Orientation.getInitialOrientation();
        if (this.state.pageHeight > this.state.pageWidth) {
            return(
                <View style = {{alignItems:'center', marginTop: 0}}>
                    {this.showMusicImage()}
                    <View style = {{flexDirection:'row', marginTop: 30, alignItems:'center', maxWidth: this.state.pageWidth - 20}}>
                        {this.showPlayButton()}
                        <View style = {{marginLeft: 20}}>
                            <Text style = {styles.songtitle}>{this.state.song_title}</Text>
                            <Text style = {styles.artist}>{this.state.artist}</Text>
                            <Text style = {styles.playlisttitle}>{this.state.playlist_title}</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return(
                <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    {this.showMusicImage()}
                    <View style = {{flexDirection:'row', marginLeft: 25}}>
                        {this.showPlayButton()}
                        <View style = {{marginLeft: 25, justifyContent:'center'}}>
                            <Text style = {styles.songtitle}>{this.state.song_title}</Text>
                            <Text style = {styles.artist}>{this.state.artist}</Text>
                            <Text style = {styles.playlisttitle}>{this.state.playlist_title}</Text>
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
                    <Image 
                        source = {require('../assets/logo-radio.jpg')} 
                        style = {this.state.isPortrait? styles.logoImg: [styles.logoImg, {width:height*0.3, height: height*0.3}]}
                    />
                    {this.showSongInfo()}
                    <Text style = {[styles.genre, {width: this.state.pageWidth}]}>Choose your genre:</Text>
                    
                </View>

                <View style = {[styles.tabView, { width: this.state.pageWidth }]}>
                    <TouchableWithoutFeedback onPress = {this.onSlow}>
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


//make this component available to the app
export default Dashboard;
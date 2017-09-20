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
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';

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
            imageURL: '',
            songID: Number,
        };
    }
    componentWillMount() {
        StatusBar.setHidden(true)
        this.loadData1('http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get')
    }

    componentDidMount() {
        // timer = setInterval(() => {
        //     this.loadChangedArtInfo('http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get');
        //     console.log(this.state.songID);
        // }, 15000);
    }
    loadData1(JsonURL){
        console.log(JsonURL)
        fetch(JsonURL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
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
        console.log(JsonURL)
        fetch(JsonURL, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('Music Info')
            console.log(responseData)
            console.log(responseData.data[0].track.title)
            console.log('SONG ID -->'+ responseData.data[0].track.id,)
            ReactNativeAudioStreaming.play(responseData.data[0].tuneinurl + '.mp3', {showIniOSMediaCenter: true, showInAndroidNotifications: true});
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
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
            console.log('loadChangedArtInfo')
            console.log(responseData)
            console.log(responseData.data[0].track.title)
            console.log('SONG ID -->'+ responseData.data[0].track.id,)
            if(responseData.data[0].track.playlist){
                this.setState({
                    playlist_title: responseData.data[0].track.playlist.title,
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

    play(){
        ReactNativeAudioStreaming.play(this.state.selectedMusicSource, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    }

    onShow = () => {
        clearInterval(timer); 
        
        if(!this.state.isPlay){
            isPlay = true
        }
        ReactNativeAudioStreaming.pause()
        timer = setInterval(() => {
            this.loadChangedArtInfo('http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get');
            console.log(this.state.songID);
        }, 15000);
        this.loadData('http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get');
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
            this.loadChangedArtInfo('http://admin.r116radio.com:2199/rpc/r116hiphop/streaminfo.get');
            console.log(this.state.songID);
        }, 15000);
        this.loadData('http://admin.r116radio.com:2199/rpc/r116hiphop/streaminfo.get');
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
            this.loadChangedArtInfo('http://admin.r116radio.com:2199/rpc/r116pop/streaminfo.get');
        }, 15000);
        this.loadData('http://admin.r116radio.com:2199/rpc/r116pop/streaminfo.get');
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
        }else{
            clearInterval(timer); 
            ReactNativeAudioStreaming.pause()
        }

    }
    showPlayButton(){
        return(
            <TouchableWithoutFeedback onPress = {this.onPressPlay}>
                <Image source = {this.state.isPlay? require('../assets/stop.png'):require('../assets/play.png')} style = {styles.startImg}></Image>
            </TouchableWithoutFeedback>
        )
    }
    showSongInfo(){
        if(this.state.pageWidth < 600){
            return(
                <View style = {{alignItems:'center', marginTop: 0}}>
                    <Image 
                        source={{uri: this.state.imageURL}}
                        style={styles.musicImg}
                        defaultSource = {require('../assets/placeholder.jpg')}
                    />
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
        }
        else{
            return(
                <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Image 
                        source={{uri: this.state.imageURL}}
                        style={styles.musicImg}
                        defaultSource = {require('../assets/placeholder.jpg')}
                    />
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

        console.log(this.state.selectedMusicSource)    
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                {}
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
        width: width*0.3,
        height: width*0.3,
        resizeMode: 'contain'
    },
    musicImg: {
        width: width*0.3,
        height: width*0.3,
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
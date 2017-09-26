import {
    Dimensions,
  } from 'react-native';
import Constant  from '../common/Constant'
var {height, width} = Dimensions.get('window');

export default{
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
    startPortImg: {
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
    },
    placeholderText:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
}
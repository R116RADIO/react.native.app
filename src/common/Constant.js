import {Dimensions, Platform} from 'react-native'


module.exports = {
    TAP_COLOR: '#780b10',
    WIDTH_SCREEN : Dimensions.get('window').width,
    HEIGHT_SCREEN : Dimensions.get('window').height,
    HEIGHT_KEYBOARD_IOS : 216,

    SLOW_JAMES_URL : 'http://admin.r116radio.com:2199/rpc/r116slowjams/streaminfo.get',
    HIP_HOP_URL : 'http://admin.r116radio.com:2199/rpc/r116hiphop/streaminfo.get',
    POP_MUSIC_URL : 'http://admin.r116radio.com:2199/rpc/r116pop/streaminfo.get',
}

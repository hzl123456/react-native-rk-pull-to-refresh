import React, {Component} from 'react';
import {Image, Animated, Easing} from 'react-native';

const arrow = require('./refresh_icon.png')

export default class Arrow extends Component {

    constructor(props) {
        super(props);
        this.state = {rotate: '0deg'}
    }

    render() {
        return (
            <Image
                source={arrow}
                style={{width: 30, height: 30, transform: [{rotate: this.state.rotate}]}}/>
        )
    }

    setRotate = (rotate) => {
        this.setState({rotate: `${rotate}deg`})
    }

    //重置刷新的操作
    startRotate = () => {
        this.state.rotate = 0
        Animated.timing(this.state.rotate, {
            toValue: '360deg',
            easing: Easing.linear,
            duration: 1000
        }).start(() => {
            this.startRotate()
        })
    }

    //停止转动
    stopRotate = () => {


    }
}
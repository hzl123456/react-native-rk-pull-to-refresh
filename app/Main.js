import React, {Component} from 'react';
import {View, Platform, Dimensions, ViewPagerAndroid} from 'react-native';

import PullViewDemo from './demo/PullViewDemo'
import PullScrollViewDemo from './demo/PullScrollViewDemo'
import PullListViewDemo from './demo/PullListViewDemo'
import PullFlatListDemo from './demo/PullFlatListDemo'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './demo/ScrollableTabBar'

const {width} = Dimensions.get('window')

export default class Main extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true; //忽略黄色警告
        this.state = {locked: false, currentIndex: 0}
    }

    render() {
        if (Platform.OS == 'android') {
            return this.renderAndroid();
        } else {
            return this.renderIos();
        }
    }

    renderIos = () => {
        return (
            <ScrollableTabView
                locked={this.state.locked}
                style={{flex: 1, marginTop: 20, backgroundColor: 'white'}}>
                <PullViewDemo tabLabel="View" onPushing={this._onPushing}/>
                <PullScrollViewDemo tabLabel="ScrollView" onPushing={this._onPushing}/>
                <PullListViewDemo tabLabel="ListView" onPushing={this._onPushing}/>
                <PullFlatListDemo tabLabel="FlatList" onPushing={this._onPushing}/>
            </ScrollableTabView>
        )
    }

    renderAndroid = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <ScrollableTabBar
                    ref={(c) => this.tabBar = c}
                    activeTab={this.state.currentIndex}
                    containerWidth={width}
                    tabs={['View', 'ScrollView', 'ListView', 'FlatList']}
                    goToPage={this.onPressIndex}/>

                <ViewPagerAndroid
                    onPageScroll={this._onScroll}
                    onPageSelected={this.onMomentumScrollEnd}
                    ref={(c) => this.viewPager = c}
                    style={{flex: 1}}>
                    <PullViewDemo/>
                    <PullScrollViewDemo/>
                    <PullListViewDemo/>
                    <PullFlatListDemo/>
                </ViewPagerAndroid>
            </View>
        )
    }

    onPressIndex = (index) => {
        this.viewPager && this.viewPager.setPage(index)
        this.setState({currentIndex: index})
    }

    onMomentumScrollEnd = (obj) => {
        let index = obj.nativeEvent.position
        this.setState({currentIndex: index})
    }

    _onScroll = (event) => {
        let value = event.nativeEvent.position + event.nativeEvent.offset;
        this.tabBar && this.tabBar.changeScrollValue(value)
    }

    _onPushing = (locked) => {
        if (this.state.locked != locked) {
            this.setState({locked: locked})
        }
    }
}
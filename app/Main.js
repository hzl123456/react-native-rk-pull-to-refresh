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
        return (
            <ScrollableTabView
                locked={this.state.locked}
                style={{flex: 1, marginTop: Platform.OS === 'ios' ? 20 : 0, backgroundColor: 'white'}}>
                <PullViewDemo tabLabel="View" onPushing={this._onPushing}/>
                <PullScrollViewDemo tabLabel="ScrollView" onPushing={this._onPushing}/>
                <PullListViewDemo tabLabel="ListView" onPushing={this._onPushing}/>
                <PullFlatListDemo tabLabel="FlatList" onPushing={this._onPushing}/>
            </ScrollableTabView>
        )
    }

    _onPushing = (locked) => {
        if (this.state.locked != locked) {
            this.setState({locked: locked})
        }
    }
}
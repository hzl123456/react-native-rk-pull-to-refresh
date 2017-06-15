import React, {Component} from 'react';
import {View, Platform, Dimensions} from 'react-native';
import PullViewDemo from './demo/PullViewDemo'
import PullScrollViewDemo from './demo/PullScrollViewDemo'
import PullListViewDemo from './demo/PullListViewDemo'
import PullFlatListDemo from './demo/PullFlatListDemo'
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {locked: false}
    }

    render() {
        return (
            <ScrollableTabView
                locked={this.state.locked}
                style={{flex: 1, marginTop: Platform.OS == 'ios' ? 20 : 0, backgroundColor: 'white'}}>

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
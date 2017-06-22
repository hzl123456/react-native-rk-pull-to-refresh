# react-native-rk-pull-to-refresh（ios/android）
[中文说明](https://github.com/hzl123456/react-native-rk-pull-to-refresh/blob/master/README-ZH.md) <br><br>
A pull to refresh component for react-native, same api on both android and ios,also you can design you owner pull style for this component.you can use it for most of the component in react-native such as view,scrollview,listview and flatlist.
## Preview
![ios](https://github.com/hzl123456/react-native-rk-pull-to-refresh/blob/master/image/ios.gif) <br><br>
![android](https://github.com/hzl123456/react-native-rk-pull-to-refresh/blob/master/image/android.gif)
## Installation
npm install react-native-rk-pull-to-refresh --save <br>
## How to use
it contains PullView,PullScrollView,PullListView and PullFlatList.if you want to use PullFlatList,you should use this component whith React Native 0.43 and newer.then you must add this to FlatList(node_modules/react-native/Libraries/Lists/FlatList.js)
```
...
getScrollMetrics = () => {
    return this._listRef.getScrollMetrics()
}
...
```
and add this to VirtualizedList(node_modules/react-native/Libraries/Lists/VirtualizedList.js)
```
...
 getScrollMetrics = () => {
    return this._scrollMetrics
 }
 ...
```
### Use it for Listview with default style
```
import React, {PureComponent} from 'react';
import {ListView, View, Text, Dimensions} from 'react-native';
import {PullListView} from 'react-native-rk-pull-to-refresh'

const width = Dimensions.get('window').width

export default class PullListViewDemo extends PureComponent {

    constructor(props) {
        super(props);
        this.dataSource =
            new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.getDataSource())
    }

    getDataSource = () => {
        let array = new Array();
        for (let i = 0; i < 50; i++) {
            array.push(`ListViewItem:${i + 1}`);
        }
        return array;
    }

    render() {
        return (
            <PullListView
                ref={(c)=>this.pull=c}
                isContentScroll={true}
                style={{flex: 1, width: width}}
                onPushing={this.props.onPushing}
                onPullRelease={this._onPullRelease}
                dataSource={this.dataSource}
                renderRow={this._renderRow}/>
        )
    }

    _onPullRelease = () => {
        setTimeout(() => {
            this.pull && this.pull.resolveHandler()
        }, 2000)
    }

    _renderRow = (rowData) => {
        return (
            <View style={{flex: 1, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{rowData}</Text>
            </View>);
    }

    componentDidMount() {
        this.pull && this.pull.beginRefresh()
    }
}

```
### Use it for View with you owner style
```
import React, {PureComponent} from 'react';
import {View, Text, Dimensions,StyleSheet,ActivityIndicator} from 'react-native';
import {PullView} from 'react-native-rk-pull-to-refresh'

const width = Dimensions.get('window').width
const topIndicatorHeight = 50

export default class PullViewDemo extends PureComponent {

    render() {
        return (
            <PullView
                ref={(c) => this.pull = c}
                style={{flex: 1, width: width}}
                topIndicatorRender={this.topIndicatorRender}
                topIndicatorHeight={topIndicatorHeight}
                onPullStateChangeHeight={this.onPullStateChangeHeight}
                onPushing={this.props.onPushing}
                onPullRelease={this._onPullRelease}>

                <Text style={{flex: 1, width: width, paddingTop: 200, textAlign: 'center'}}>这是内容</Text>

            </PullView>
        )
    }

    onPullStateChangeHeight = (pulling, pullok, pullrelease, moveHeight) => {
        if (pulling) {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullok) {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullrelease) {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
        }
    }


    topIndicatorRender = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: topIndicatorHeight}}>
                <ActivityIndicator size="small" color="gray" style={{marginRight: 5}}/>
                <Text ref={(c) => {this.txtPulling = c;}} style={styles.hide}>pulling...</Text>
                <Text ref={(c) => {this.txtPullok = c;}} style={styles.hide}>pullok...</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>pullrelease...</Text>
            </View>
        );
    }


    _onPullRelease = () => {
        setTimeout(() => {
            this.pull && this.pull.resolveHandler()
        }, 2000)
    }

    componentDidMount() {
        this.pull && this.pull.beginRefresh()
    }
}

const styles = StyleSheet.create({
    hide: {
        position: 'absolute',
        left: 10000,
        backgroundColor: 'transparent'
    },
    show: {
        position: 'relative',
        left: 0,
        backgroundColor: 'transparent'
    }
});
```
## Full Demo
clone or download PullToRefreshDemo
## Props
Porp|Type|Optional|Default|Description
---- | ---- | -------  | ------- | ------------
refreshable | bool | yes | true |can pull to refresh or not
isContentScroll |  bool | yes |false|content scroll when pulling
onPullRelease | func |yes | | when refreshing, this function will be called
topIndicatorRender |func |yes | |top pulling render for this component,when the value is undefined,this component use default top pulling render 
topIndicatorHeight |number |yes | |top pulling render header,when topIndicatorRender is not undefined,you must set the correct topIndicatorHeight
onPullStateChangeHeight |func|yes| |when pulling, this function will be called
onPushing|func|yes| |when pulling, this function will be called
## Method
beginRefresh():force begin pull down refresh <br>
resolveHandler():end pull down refresh










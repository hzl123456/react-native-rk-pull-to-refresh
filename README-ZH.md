
# react-native-rk-pull-to-refresh（ios/android）
一个在React Native上使用的下拉刷新组件，同时支持android和ios并且拥有相同的Api。当然你可以自定义你自己的下拉刷新样式。它可以支持绝大多数的React Native中的组件实现下拉刷新功能。它里面已经实现了View,Scrollview,Listview和Flatlist的下拉刷新
## 效果展示
## 安装
npm install react-native-rk-pull-to-refresh --save <br>
react-native link react-native-rk-pull-to-refresh
## Android安装
* In android/settings.gradle
```
...
include ':react-native-rk-pull-to-refresh'
project(':react-native-rk-pull-to-refresh').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-rk-pull-to-refresh/android')
```
* In android/app/build.gradle
```
...
dependencies {
    ...
    // From node_modules
     compile project(':react-native-rk-pull-to-refresh')
}
```
* In MainApplication.java
```
...
import com.pulltorefresh.PullToRefreshPackage;    //import package
...
 @Override
 protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
             new MainReactPackage(),
             new PullToRefreshPackage()
    );
 }
...

```
## 如何使用
它内部包含了PullView,PullScrollView,PullListView和PullFlatList，如果你想使用PullFlatList的话，那么你要保持你的React Native版本在0.43及以上。并且你要添加如下的代码到FlatList(node_modules/react-native/Libraries/Lists/FlatList.js)中
```
...
getScrollMetrics = () => {
    return this._listRef.getScrollMetrics()
}
...
```
同时在VirtualizedList(node_modules/react-native/Libraries/Lists/VirtualizedList.js)中添加如下代码
```
...
 getScrollMetrics = () => {
    return this._scrollMetrics
 }
 ...
```
### PullListView默认样式的使用
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
### PullView自定义样式的使用
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
## 完整例子
克隆或者下载这个PullToRefreshDemo
## 属性
Porp|Type|Optional|Default|Description
---- | ---- | -------  | ------- | ------------
refreshable | bool | yes | true |是否需要下拉刷新功能
isContentScroll |  bool | yes |false|在下拉的时候内容时候要一起跟着滚动
onPullRelease | func |yes | | 刷新的回调
topIndicatorRender |func |yes | |下拉刷新头部的样式，当它为空的时候就使用默认的
topIndicatorHeight |number |yes | |下拉刷新头部的高度，当topIndicatorRender不为空的时候要设置正确的topIndicatorHeight
onPullStateChangeHeight |func|yes| |下拉时候的回调，主要是刷新的状态的下拉的距离
onPushing|func|yes| |下拉时候的回调，告诉外界此时是否在下拉刷新
## 方法
beginRefresh():手动调用下拉刷新功能 <br>
resolveHandler():结束下拉刷新










import React, {PureComponent} from 'react';
import {View, Text, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
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

    onPullStateChangeHeight = (pullState, moveHeight) => {
        if (pullState == 'pulling') {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullState == 'pullok') {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
        } else if (pullState == 'pullrelease') {
            this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
        }
    }


    topIndicatorRender = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: topIndicatorHeight}}>

                <ActivityIndicator size="small" color="gray" style={{marginRight: 5}}/>

                <Text ref={(c) => this.txtPulling = c} style={styles.hide}>pulling...</Text>

                <Text ref={(c) => this.txtPullok = c} style={styles.hide}>pullok...</Text>

                <Text ref={(c) => this.txtPullrelease = c} style={styles.hide}>pullrelease...</Text>

            </View>
        );
    }


    _onPullRelease = () => {
        setTimeout(() => {
            this.pull && this.pull.finishRefresh()
        }, 2000)
    }

    componentDidMount() {
        this.pull && this.pull.startRefresh()
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
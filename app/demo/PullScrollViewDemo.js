import React, {PureComponent} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PullScrollView} from 'react-native-rk-pull-to-refresh'

const width = Dimensions.get('window').width

export default class PullScrollViewDemo extends PureComponent {

    render() {
        return (
            <PullScrollView
                ref={(c)=>this.pull=c}
                style={{flex: 1, width: width}}
                onPushing={this.props.onPushing}
                onPullRelease={this._onPullRelease}>
                <View style={{flex: 1, height: 300, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>内容1</Text>
                </View>
                <View style={{flex: 1, height: 300, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>内容2</Text>
                </View>
                <View style={{flex: 1, height: 300, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>内容3</Text>
                </View>
                <View style={{flex: 1, height: 300, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>内容4</Text>
                </View>
            </PullScrollView>
        )
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
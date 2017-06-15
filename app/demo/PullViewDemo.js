import React, {PureComponent} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PullView} from 'react-native-rk-pull-to-refresh'

const width = Dimensions.get('window').width

export default class PullViewDemo extends PureComponent {

    render() {
        return (
            <PullView
                ref={(c) => this.pull = c}
                style={{flex: 1, width: width}}
                onPushing={this.props.onPushing}
                onPullRelease={this._onPullRelease}>

                <Text style={{flex: 1, width: width, paddingTop: 200, textAlign: 'center'}}>这是内容</Text>

            </PullView>
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
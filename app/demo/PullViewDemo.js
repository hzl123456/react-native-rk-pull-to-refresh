import React, {PureComponent} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PullView} from 'react-native-rk-pull-to-refresh'
import Arrow from './Arrow'

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
        if (!pullrelease) { //没有释放的时候就跟随手指进行转动
            //停止自转
            this.arrow && this.arrow.stopRotate()
            //开始跟随手指进行转动
            this.arrow && this.arrow.setRotate(moveHeight)
        } else { //释放状态的时候就进行自转
            this.arrow && this.arrow.startRotate()
        }
    }


    topIndicatorRender = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', height: topIndicatorHeight}}>
                <Arrow ref={(c) => this.arrow = c}/>
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
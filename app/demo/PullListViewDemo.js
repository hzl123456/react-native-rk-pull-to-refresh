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
                ref={(c) => this.pull = c}
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
            this.pull && this.pull.finishRefresh()
        }, 2000)
    }

    _renderRow = (rowData) => {
        return (
            <View style={{width: width, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{rowData}</Text>
            </View>);
    }

    componentDidMount() {
        this.pull && this.pull.startRefresh()
    }
}



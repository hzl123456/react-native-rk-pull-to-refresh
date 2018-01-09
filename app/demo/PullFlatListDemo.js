import React, {PureComponent} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PullFlatList} from 'react-native-rk-pull-to-refresh'

const width = Dimensions.get('window').width
export default class PullFlatListDemo extends PureComponent {

    constructor(props) {
        super(props);
        this.dataSource = this.getDataSource()
    }

    getDataSource = () => {
        let array = new Array();
        for (let i = 0; i < 50; i++) {
            array.push({key: i, value: `FlatListItem:${i + 1}`});
        }
        return array;
    }

    render() {
        return (
            <PullFlatList
                ref={(c) => this.pull = c}
                isContentScroll={true}
                ItemSeparatorComponent={() => <View style={{flex: 1, height: 0.5, backgroundColor: '#cbcbcb'}}/>}
                style={{flex: 1, width: width}}
                onPushing={this.props.onPushing}
                onPullRelease={this._onPullRelease}
                data={this.dataSource}
                renderItem={this._renderRow}/>
        )
    }

    _onPullRelease = () => {
        setTimeout(() => {
            this.pull && this.pull.finishRefresh()
        }, 2000)
    }

    _renderRow = (rowData) => {
        return (
            <View style={{flex: 1, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{rowData.item.value}</Text>
            </View>);
    }

    componentDidMount() {
        this.pull && this.pull.startRefresh()
    }

}
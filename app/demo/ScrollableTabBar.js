/**
 * 作者：请叫我百米冲刺 on 2018/1/5 上午10:16
 * 邮箱：mail@hezhilin.cc
 */
'use strict';
import React, {PureComponent, PropTypes} from  'react';
import {StyleSheet, View, TouchableOpacity, Text, Animated} from  'react-native';

export default class TabLayout extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            scrollValue: new Animated.Value(this.props.activeTab)
        }
    }

    static  propTypes = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    }

    static defaultProps = {
        activeTextColor: 'navy',
        inactiveTextColor: 'black',
        backgroundColor: null,
    }

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.flexOne}
                key={name}
                accessible={true}
                accessibilityLabel={name}
                accessibilityTraits='button'
                onPress={() => onPressHandler(page)}>
                <View style={[styles.tab, this.props.tabStyle]}>
                    <Text style={[{color: textColor, fontWeight,}, textStyle]}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 4,
            backgroundColor: 'navy',
            bottom: 0,
        };
        const left = this.state.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs],
        });
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor,}, this.props.style]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return this.renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                <Animated.View style={[tabUnderlineStyle, {left}]}/>
            </View>
        );
    }

    changeScrollValue(value) {
        this.state.scrollValue.setValue(value)
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    flexOne: {
        flex: 1,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});

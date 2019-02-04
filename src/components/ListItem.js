import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    Platform 
} from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import { selectLibrary } from '../actions';

class ListItem extends Component {

    componentWillUpdate() {
        if(Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.easeInEaseOut();
    }

    renderDescription() {
        const { expanded, library } = this.props;

        if(expanded) {
            return (
                <CardSection>
                    <Text>{library.description}</Text>
                </CardSection>
            );
        }
    }

    render () {
        const { id, title } = this.props.library;

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    descriptionStyle: {
        fontSize: 14,
        fontStyle: 'italic',
        paddingLeft: 15
    }
};

const mapStateProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
}

export default connect(mapStateProps, { selectLibrary })(ListItem);
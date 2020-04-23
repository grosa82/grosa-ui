import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as internal from './utils/internal';

class Swipe extends Component {
    constructor(props) {
        super(props);

        this.swipeComp = React.createRef();
    }
    componentDidMount() {
        const { onSwipe } = this.props;
        internal.swipeDetect(this.swipeComp.current, swipeDirection => {
            if (swipeDirection)
                onSwipe(swipeDirection);
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div ref={this.swipeComp}>
                { children }
            </div>
        );
    }
}

Swipe.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onSwipe: PropTypes.func.isRequired
};

export default Swipe;
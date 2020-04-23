import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

import { Swipe, SWIPE_DIRECTION } from './';

class SwipeDownRefresh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleSwipe = (direction) => {
        if (direction === SWIPE_DIRECTION.D) {
            this.setState({ loading: true });
            this.props.onSwipe();
        }
    }

    finishUpdate = () => {
        this.setState({ loading: false });
    }
    
    render() {
        const { children, refreshingElement } = this.props;
        return <Swipe onSwipe={this.handleSwipe}>
            <div>
                <Fade top when={this.state.loading} duration={200}>
                    <div style={{ position: 'absolute', top: 20, left: 0, width: window.innerWidth, textAlign: 'center', display: this.state.loading ? 'block' : 'none' }}>
                        {refreshingElement ? refreshingElement : 'Refreshing...'}
                    </div>
                </Fade>
                {children}
            </div>
        </Swipe>;
    }
}

SwipeDownRefresh.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    refreshingElement: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onSwipe: PropTypes.func.isRequired
};

export default SwipeDownRefresh;
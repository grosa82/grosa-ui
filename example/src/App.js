import React from 'react'

import { Swipe, SwipeDownRefresh, SWIPE_DIRECTION, sleep } from 'grosa-ui';
import 'grosa-ui/dist/index.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white'
        }
        this.refresh = React.createRef();
    }

    handleSwipe = (direction) => {
        switch (direction) {
            case SWIPE_DIRECTION.U:
                this.setState({ color: 'black' });
                break;
            case SWIPE_DIRECTION.D:
                this.setState({ color: 'red' });
                break;
            case SWIPE_DIRECTION.L:
                this.setState({ color: 'green' });
                break;
            case SWIPE_DIRECTION.R:
                this.setState({ color: 'yellow' });
                break;
            default:
                break;
        }
    }

    callUpdate = () => {
        sleep(5000).then(() => {
            this.refresh.current.finishUpdate();
        });
    }

    render() {
        return <div style={{ height: 2000 }}>
            {/* <Swipe onSwipe={this.handleSwipe}>
                <div style={{ width: 200, height: 200, backgroundColor: this.state.color, border: "1px solid gray" }}>
                    Swipe in any direction
                </div>
            </Swipe> */}
            <SwipeDownRefresh
                ref={this.refresh}
                onSwipe={this.callUpdate}
                refreshingElement={<img src="https://secure.cdn4.wdpromedia.com/media/dvc_site/2018.01.0-130/images/loading.gif" alt="refreshing" />}>
                <div style={{ width: 200, height: 5000, backgroundColor: this.state.color, border: "1px solid gray" }}>
                    Swipe down to refresh
                </div>
            </SwipeDownRefresh>
        </div>;
    }
}
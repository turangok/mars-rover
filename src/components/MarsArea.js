import React, { Component } from 'react';
import { Container } from "reactstrap";

class MarsArea extends Component {
    constructor(props) {
        super(props);
        console.log('tg..constructor maresarea props:', props)
    }

    render() {
        const { currentX, currentY, currentDir, errorOccured } = this.props.state;
        console.log('Error occured:', errorOccured)
        return (
            <div>
                <Container fluid>
                    <div className="col-md-6">
                        <h2>
                            <span className="badge badge-success">
                                Final position : {currentX + '-' + currentY + '-' + currentDir}
                            </span>
                        </h2>
                    </div>
                </Container>
            </div>
        );
    }
}

export default MarsArea;
import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import SelectionBar from './SelectionBar';
import ResizeCanvasImage from './ResizeCanvasImage';

export default class extends Component {
    state = {
        images: []
    };

    handleClick = event => {
        const image = new window.Image();
        image.src = event.target.src;
        image.onload = () => {
            this.setState({images: [...this.state.images, image]});
        };
    };

    render() {
        return (
            <div className='root-canvas'>
                <div className='root-canvas-selection-bar'>
                    <SelectionBar click={this.handleClick}/>
                </div>
                <div className="root-canvas-info">
                    <Stage width={window.innerWidth} height="700">
                        <Layer>
                            {this.state.images &&
                            this.state.images.map((img, i) => {
                                return <ResizeCanvasImage key={i} image={img}/>;
                            })}
                        </Layer>
                    </Stage>
                </div>
            </div>
        );
    }
}

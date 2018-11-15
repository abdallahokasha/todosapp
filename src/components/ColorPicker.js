import React from 'react'
import { SliderPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

class ColorPicker extends React.Component {
    state = {
        displayColorPicker: false,
        chosenColor: "#FFF",
    };
    handleColor(color, evt) {
        //console.log(value, " ", color, " ", evt)
        this.setState({ chosenColor: color.hex })
    }
    handleColorPickerClose() {
        this.setState({ displayColorPicker: false });
    }
    render() {
        return (
            <div>
                {/* <Dialog open={this.state.displayColorPicker} onClose={this.handleColorPickerClose}>
                    <DialogTitle>{"You can choose custom color for this todo"}</DialogTitle>
                    <DialogContent>

                        <GithubPicker
                            color={this.state.chosenColor}
                            style={{ marginLeft: '15%' }}
                            onChangeComplete={(color, evt) => this.handleColor(color, evt)}
                        />
                        <button onClick={this.handleColorPickerClose} raised color="primary">Choose</button>
                    </DialogContent>
                </Dialog> */}
                <SliderPicker />
            </div>
        )
    }
}

export default ColorPicker
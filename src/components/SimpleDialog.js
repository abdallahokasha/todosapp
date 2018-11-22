import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class SimpleDialog extends React.Component {
    state = {
        open: this.props.openDialog,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.handleDialogClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        </DialogContentText>
                        {this.props.dialogContent}
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                    <button className="roundedButton todoButtons" onClick={this.handleClose}>Select</button>
                </Dialog>
                </div>
        )
    }

}
export default SimpleDialog;
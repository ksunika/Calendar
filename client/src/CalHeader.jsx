import React, {Component} from 'react';

class CalHeader extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleForward = this.handleForward.bind(this);
    }
    handleBack(e) {
        this.props.handleBack(e.target.value);
    }

    handleForward(e) {
        this.props.handleForward(e.target.value);
    }

    render() {
        const months = [ '', 'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December' ];

        return <div className = 'month-header'>
                  <div className = 'month-header-arrows'
                       onClick={this.handleBack}>&larr;&nbsp;</div>
                     <div className = 'month-header-month-year'>
                        {months[this.props.month]} {this.props.year}
                     </div>
                  <div className = 'month-header-arrows'
                       onClick={this.handleForward}>&nbsp;&rarr;</div>
             </div>
    }
  }
export default CalHeader;

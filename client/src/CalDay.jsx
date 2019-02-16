import React, {Component} from 'react';

class CalDay extends Component {
    render() {
        let titlesList = '';
        if (this.props.dayData) {
            titlesList = (this.props.dayData).map(obj => {
              return <div className = 'list-item' key = {obj.id}>{obj.title}</div>;
        });}
        return (
            <div className = "calendar-day">
              {this.props.day}
              <div className = 'list'>{titlesList}</div>
            </div>
        );
    }
}

export default CalDay;

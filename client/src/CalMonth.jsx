import React, {Component} from 'react';
import EmptyDay from './EmptyDay';
import CalHeader from './CalHeader';
import CalDay from './CalDay';


const WeekHeader = (props) => {
    const weekDays = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return <div className = 'container-weekdays'> {
              weekDays.map(day => {return(
                    <div key = {day} className = {'calendar-day week-header'}>
                        {day}
                    </div>);})}
          </div>;
}
const MonthBody = (props) => {
    let days = [];

// adds empty cells before the 1st day of the month
    while (days.length < props.monthStartDay - 1) {
        days.push(<EmptyDay key = {days.length}/>);
    }

    for (let i = 1; i <= props.daysInMonth; i++) {
        days.push(<CalDay key={days.length}
                          day = {i}
                          dayData = {props.monthData[i] ? props.monthData[i] : ''}/>);
    }

// adds empty cells after the last day of the month
    while (days.length % 7 != 0) {
        days.push(<EmptyDay key = {days.length}/>);
    }

    return <div className = 'container-weekdays'>{days}</div>;
}

class CalMonth extends Component {
  constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleForward = this.handleForward.bind(this);
        this.state = {year: props.initialYear,
                      month: props.initialMonth,
                      monthData: {}};
    }

    fetchData = async (year, month) => {
        try {
            const response = await fetch(`/api/${year}/${month}`, { method: 'GET' });
            const data = await response.json();
            const monthData = this.handleMonthData(data);
            this.setState({monthData});
        }
        catch (err) {
          console.log(err);
        }
    }

    componentDidMount() {
        this.fetchData(this.state.year, this.state.month);
    }

// organizes fetched data creating an array corresponding to each day
    handleMonthData(data) {
        const monthData = {};
        data.map((obj) => {
              const launch_date = new Date(obj['launch_date']);
              if (!monthData[launch_date.getDate()]) {
                  monthData[launch_date.getDate()] = new Array();
              }
              monthData[launch_date.getDate()].push(obj);
        });
        return monthData;
    }

    handleBack() {
        let month = this.state.month;
        let year = this.state.year;

        if (month === 1) {
            month = 12;
            year--;
        }
        else {
            month--;
        }
        this.setState({year: year, month: month, monthData: ''});
        this.fetchData(year, month);
    }

    handleForward() {
        let month = this.state.month;
        let year = this.state.year;

        if (month === 12) {
            month = 1;
            year++;
        }
        else {
            month++;
        }
        this.setState({year: year, month: month, monthData: ''});
        this.fetchData(year, month);
    }

  render() {
      const month = this.state.month;
      const year = this.state.year;

      const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
      const firstDay = (new Date(year, month - 1)).getDay() + 1;

      return (
        <div>
            <CalHeader month = {month}
                       year = {year}
                       handleBack={this.handleBack}
                       handleForward = {this.handleForward}/>
            <div className = 'container-month'>
              <WeekHeader/>
              <MonthBody daysInMonth = {daysInMonth}
                         monthStartDay = {firstDay}
                         monthData = {this.state.monthData}/>
            </div>
        </div>
      );
    }
}

export default CalMonth;

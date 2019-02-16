import './App.css';
import CalMonth from './CalMonth';

import * as React from 'react';

class App extends React.Component {

    validatePath(path: string) {
        if (!path) {
            path = '';
        }
        const year = path.split('/')[1];
        const month = path.split('/')[2];

        if (this.validateMonth(month) && this.validateYear(year)) {
            return {month: parseInt(month),
                    year: parseInt(year)};
        }

        const today = new Date();
        return {month: today.getMonth() + 1,
                year: today.getFullYear()};
    }

    validateMonth(month: string) {
        return (parseInt(month) && parseInt(month) <= 12 && parseInt(month) >= 1);
    }

    validateYear(year: string) {
        return (parseInt(year) && year.length === 4);
    }

    render() {
      const path = this.validatePath(window.location.pathname); // {'month' : 2, 'year' : 2019};
      const month = path.month;
      const year = path.year;

      return (
        <div className = 'container-main'>
            <CalMonth initialMonth = {month}
                      initialYear = {year}
            />
        </div>
      );
    }
}
export default App;

import React, { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar';

function App() {
  const [calendarType, setCalendarType] = useState<'single' | 'range'>('single');

  return (
    <div className="App">
      <Calendar type={calendarType} />

      <div className='calendarType'>
        <div className={`button${calendarType === 'single' ? ' active' : ''}`} onClick={() => setCalendarType('single')}>Single</div>
        <div className={`button${calendarType === 'range' ? ' active' : ''}`} onClick={() => setCalendarType('range')}>Range</div>
      </div>
    </div>
  );
}

export default App;

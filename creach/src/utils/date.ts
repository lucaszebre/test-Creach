import React from 'react';

const LyricalDate = ( date:Date ) => {
  const lyricalMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const lyricalDays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const lyricalSuffixes = ['st', 'nd', 'rd', 'th'];

  const month = lyricalMonths[date.getMonth()];
  const dayOfWeek = lyricalDays[date.getDay()];
  const day = date.getDate();
  const suffix = lyricalSuffixes[Math.min(day - 1, 3)]; // Handle suffixes for 1st, 2nd, 3rd, and beyond

  const lyricalDate = `${day}${suffix} ${month}, ${date.getFullYear()}, ${dayOfWeek}`;

  return lyricalDate
};

export default LyricalDate;

// src/DiaryComponent.jsx
import React, { useState } from 'react';

const DiaryComponent = () => {
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [content, setContent] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setContent(entries[e.target.value] || '');
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveEntry = () => {
    setEntries({ ...entries, [selectedDate]: content });
    setContent('');
    setSelectedDate('');
  };

  const renderEntries = () => {
    return Object.keys(entries).map(date => (
      <div key={date} onClick={() => handleDateSelect(date)}>
        {date}
      </div>
    ));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setContent(entries[date]);
  };

  const insertImage = (url) => {
    setContent(content + `![Image](${url})`);
  };

  const insertVideo = (url) => {
    setContent(content + `[![Video](${url})](${url})`);
  };

  const insertUrl = (url, text) => {
    setContent(content + `[${text}](${url})`);
  };

  return (
    <div>
      <h1>Diary</h1>
      <div>
        <label>Select Date: </label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <textarea value={content} onChange={handleContentChange} rows="10" cols="50" />
      </div>
      <button onClick={handleSaveEntry}>Save Entry</button>
      <div>
        <h2>Entries</h2>
        {renderEntries()}
      </div>
      <div>
        <h2>Insert Media</h2>
        <input type="text" placeholder="Image URL" onBlur={(e) => insertImage(e.target.value)} />
        <input type="text" placeholder="Video URL" onBlur={(e) => insertVideo(e.target.value)} />
        <input type="text" placeholder="Link URL" onBlur={(e) => insertUrl(e.target.value, prompt('Enter link text'))} />
      </div>
    </div>
  );
};

export default DiaryComponent;

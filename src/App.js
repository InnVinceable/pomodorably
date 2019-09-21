import React, { useState } from 'react';
import TimerPage from './Components/timer-page';
import OptionsPage from './Components/options-page';
import { FaCog } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const App = () => {
    let [showOptions, setShowOptions] = useState(false);

    const closeWindow = () => {
        window.close();
    }

    return <div>
        <div className="top-bar">
            <button className="top-bar-btn" onClick={() => setShowOptions(!showOptions)}><div><FaCog /></div></button>
            <button onClick={closeWindow} className="top-bar-btn"><IoMdClose /></button>
        </div>
        <div style={showOptions ? { display: 'none' } : {}}>
            <TimerPage />
        </div>
        <div style={!showOptions ? { display: 'none' } : {}}>
            <OptionsPage />
        </div>
    </div>
}

export default App;

import React from 'react'

import './TimeBar.scss'

interface TimeBarProps {
    progress: number
    timeRemaining: number
}

function TimeBar({ progress, timeRemaining }: TimeBarProps) {
    return (
        <div className="time-bar">
            <span className="time-bar__title">Time Remaining</span>
            <progress className="time-bar__progress" value={progress} max={100}></progress>
            <span className="time-bar__text">{ timeRemaining + ` second${timeRemaining > 1 ? 's' : ''}` }</span>
        </div>
    );
};

export default TimeBar;
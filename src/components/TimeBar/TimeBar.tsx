import React from 'react';

interface TimeBarProps {
    progress: number;
}

function TimeBar({ progress }: TimeBarProps) {
    return (
        <div className="time-bar">
            <progress className="time-bar__progress" value={progress} max={100}></progress>
        </div>
    );
};

export default TimeBar;
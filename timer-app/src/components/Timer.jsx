import React, { useEffect, useState } from 'react';
import TimerRing from './TimerRing';
import { use } from 'react';


function TimerDisplay({ time , setTime}) {

    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');


    useEffect(() => {

        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;

        setHours(formatNumber(h));
        setMinutes(formatNumber(m));
        setSeconds(formatNumber(s));

    }, [time]);

    const formatNumber = (num) => {
        if (num === '') {
            return '00';
        }
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    }

    const checkValidTime = (time) => {

        if ( time.length>0 && time.length <= 2 && time.match(/^[0-9]*$/)) {
            return true;
        }
        return false;
    }


    function keyPress(e) {

        // get id 
        const id = e.target.id;

        if (e.code === 'Enter' || e.code === 'Tab') {
            if (id === 'hours') {
                document.getElementById('minutes').focus();
            } else if (id === 'minutes') {
                document.getElementById('seconds').focus();
            } else if (id === 'seconds') {
                document.getElementById('seconds').blur();
            }
        }
    }

    const handleTimeChange = (e) => {
        const t = e.target.value.replace(/^0+/, '');

        let _t = 0;
        if (checkValidTime(t)) {
            if (e.target.id === 'hours') {
                _t = parseInt(minutes) * 60 + parseInt(seconds);
                if (parseInt(t) > 23) {
                    setHours('23');
                    _t += 23 * 3600;
                }
                else{
                    setHours(formatNumber(t));
                    _t += parseInt(t) * 3600;
                }
                setTime(_t);
            } else if (e.target.id === 'minutes') {
                _t = parseInt(hours) * 3600 + parseInt(seconds);
                if (parseInt(t) > 59) {
                    setMinutes('59');
                    _t += 59 * 60;
                }
                else{
                    setMinutes(formatNumber(t));
                    _t += parseInt(t) * 60;
                }
                setTime(_t);
            } else if (e.target.id === 'seconds') {
                
                _t  = parseInt(hours) * 3600 + parseInt(minutes) * 60;
                if (parseInt(t) > 59) {
                    setSeconds('59');
                    _t += 59;
                }
                else{
                    setSeconds(formatNumber(t));
                    _t += parseInt(t);
                }
                setTime(_t);

            }
        }

     
    }

    return (

        <div class="timer-display">
            <div class="colon">
                <input type="text" value={hours} class="time-input" id="hours" onChange={handleTimeChange} onKeyDown={keyPress} />
            </div>
            <div class="colon">:</div>

            <div class="colon">

                <input type="text" value={minutes} class="time-input" id="minutes" onChange={handleTimeChange} onKeyDown={keyPress} />
            </div>

            <div class="colon">:</div>

            <div class="colon">

                <input type="text" value={seconds} class="time-input" id="seconds" onChange={handleTimeChange} onKeyDown={keyPress} />
            </div>

        </div>

    )
}



export default function Timer() {

    const [time, setTime] = useState(0) // seconds
    const [isRunning, setIsRunning] = useState(false)
    const [timeleft, setTimeleft] = useState(0);
    const [timer, setTimer] = useState(null);


    const handleStart = () => {
        setIsRunning(true);
        setTimeleft(time);

        // every second decreament count 

        const interval = setInterval(() => {
            setTimeleft((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setTimer(interval);
    }

    useEffect(()=>{


    },time)

    const handlePause = () => {

        setIsRunning(false);

        clearInterval(timer);

    }

   
    const handleReset = () => {
        
        clearInterval(timer);

        setIsRunning(false);

        setTimeleft(0);

        setTime(0);

    }

    const handleSetTime = (t) => {
        if(isRunning){
            alert('Timer is running. Please pause it first');
        }
        else{
            setTime(t);
            setTimeleft(t);
        }
    }

    return (
        <div class="timer-container">

            <div style={{ position: 'relative' }}>


                <div syle={{ position: 'absolute', top: 0, left: 0 }}>
                    <TimerRing timeleft={timeleft} totalTime={time} />
                </div>

                {/* center  */}
                <div style={{ position: 'absolute', top: 200, left :100 }}>

                    <TimerDisplay time={timeleft} setTime={handleSetTime} />
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', width: '100%' }}>
               
               {
                     isRunning ? <button onClick={handlePause}>Pause</button> : <button onClick={handleStart}>Start</button>
               }
            

                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )

}
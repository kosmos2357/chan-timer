import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/* TODO: 

1. timer display 
2. Start/Stop Buttons
*/

// CONSTANT DECLARATION
const INITIAL_TIME_IN_SECONDS = 2700;
const bowlSound = new Audio('/bowl-sound.mp3');


function App() {

  //Define a function to handle "Start" click.
  // Our callback
  function handleStartClick(){
    // A trick to unlock audio on the browser
    bowlSound.play();
    bowlSound.pause();
    // A trick to unlock audio on the browser

    setIsRunning(true);
    console.log("Start button clicked!");
  }

  function handleStopclick(){
    
    setIsRunning(false);
    bowlSound.pause();
    console.log("Stop button clicked!");
  }
  
  function handleResetClick(){
    setIsRunning(false);
    bowlSound.pause();
    setTime(inputMinutes * 60);
  }
  //UseState standard hook for react to give component memory or state
  // useState now creates a state variable
  // this variable does two things const [thing1,thing2]
  // a. current value
  // b. function update that value with setSeconds
  const [time, setTime] = useState(INITIAL_TIME_IN_SECONDS); 
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [inputMinutes, setInputMinutes] = useState(5)
  //
  //Now to get a component to perform a task like a clock counting down. We use useEffect
  //useEffect(() => { ... }, []) 
  // Going to use two methods setInterval and clearInterval
  // the hook separated into two parts 1. updater and 2. cleanup function 
  useEffect(() => { 
    let interval = null
    if(isRunning && time > 0) {
        interval  = setInterval(() =>{
          setTime(prevTime => prevTime - 1);
      }, 1000); // Update our logic every 1000 ms or 1s
    } else if (isRunning && time === 0){
      bowlSound.play();
      alert("TIMER ENDED")
      setIsRunning(false);
    }
    return ()=> clearInterval(interval)
  }, [isRunning, time]); // The empty array `[]` means this effect runs only ONCE


  /* Changes made with stop/start feature
    New state

    const interval switched to let interval = null

    if(isRunning && time > 0) now govern setInterval logic

    isRunning and time added to dependancy array [isRunning, time]

    handle start/stop handlers which are passsed into their props
  
  
  */

  /* An Alternative way to use useEffect */ 
  // Define setup function
  function handleTimerEffect(){
    console.log("Using traditional Method")
    let interval = null;

    if(isRunning && time > 0) {
        interval  = setInterval(() =>{
          setTime(prevTime => prevTime - 1);
      }, 1000); // Update our logic every 1000 ms or 1s
    } else if (isRunning && time === 0){
      bowlSound.play();
      alert("TIMER ENDED")
      setIsRunning(false);
    }
    return ()=> clearInterval(interval)
    
  }
  // pass named function to useffect with dependency array
  //Since we are already applying useEffect we comment the call out
  //useEffect(handleTimerEffect, [isRunning, time]);

 // Here is the new function
  function handleLapClick() {
    // We call the state setter for our laps array
    setLaps([...laps, time]);
  }

  // Helper function to format the time for display
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }
  function handleSetTimeClick() {
    setIsRunning(false); // Stop the timer
    setTime(inputMinutes * 60); // Convert minutes to seconds and update the timer
  }

  // MATH
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  
  return (
    <>
     <div className="app-container">
      <h1>Meditation Bowl Timer</h1>
     

      <div>
        <h2>{`${minutes}:${String(seconds).padStart(2, '0')}`}</h2> {/* Template Literal `${var}` */}
      </div>
      {/*pass handleStartClick to onClick prop*/}
      {/* We pass the function not the result! of calling handleStart()*/}
      <button onClick={handleStartClick}>
        Start
      </button>
      
      <button onClick= {handleStopclick}>
        Stop
      </button>
      <button onClick= {handleResetClick}>
        Reset
      </button>
      <button onClick={handleLapClick}>Lap</button>
        <ul>
          {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </li>
            ))}
        </ul>
        <div>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              />
            <button onClick={handleSetTimeClick}> Set Time</button>
        </div>
     </div>
    </>
  )
}

export default App

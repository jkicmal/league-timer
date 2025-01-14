import { useCallback, useEffect, useState } from "react";
import { TIMER_EVENTS } from "./timer-event.model";
import { getTime, MINUTE_IN_MS, SECONDS_IN_MS } from "./timer";
import { getCreepsAtMinute, getWaveNumber } from "./waves";
import { clone, speak } from "./tools";

const INTERVAL = 125;

export const App = () => {
  const [eventsState, setEventsState] = useState(clone(TIMER_EVENTS));
  const [lastTick, setLastTick] = useState(new Date());
  const [ticks, setTicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [minutes, seconds] = getTime(ticks);

  const onTick = useCallback(() => {
    if (seconds % 5 !== 0) return;

    const eventWithVoiceToRun = eventsState.filter(
      (e) =>
        e.voice !== null &&
        e.voice.time[0] === minutes &&
        e.voice.time[1] === seconds &&
        e.voice.notified === false
    )[0];

    if (eventWithVoiceToRun) {
      const voiceToRun = eventWithVoiceToRun.voice;
      if (voiceToRun !== null) {
        speak(voiceToRun.text);
        setEventsState((prevEventsState) => {
          const nextEventsState = clone(prevEventsState);
          const nextVoiceToRun = nextEventsState.find(
            (e) => e.id === eventWithVoiceToRun.id
          );
          if (!nextVoiceToRun?.voice?.notified) {
            nextVoiceToRun!.voice!.notified = true;
          }
          return nextEventsState;
        });
      }
    }
  }, [eventsState, minutes, seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isRunning) return;
      const currentDate = new Date();
      setTicks(
        (prevTicks) => prevTicks + currentDate.getTime() - lastTick.getTime()
      );
      setLastTick(new Date());
      onTick();
    }, INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, [lastTick, isRunning, onTick]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, MINUTE_IN_MS);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleModifySeconds = (seconds: number) => {
    setTicks((prevTicks) => {
      const nextTicks = prevTicks + SECONDS_IN_MS * seconds;
      if (nextTicks <= 0) return 0;
      return nextTicks;
    });
  };

  const handleStart = () => {
    if (isRunning) return;
    setLastTick(new Date());
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTicks(0);
    setEventsState(clone(TIMER_EVENTS));
  };

  const handleStop = () => {
    if (!isRunning) return;
    setIsRunning(false);
  };

  return (
    <div className="bg-black w-screen h-screen scroll-auto text-white flex justify-center items-center font-mono flex-col">
      <div className="text-2xl">
        {currentDate.getHours().toString().padStart(2, "0")}:
        {currentDate.getMinutes().toString().padStart(2, "0")}
      </div>
      <div className="flex text-2xl gap-4">
        <button onClick={() => handleStart()}>▶️</button>
        <button onClick={() => handleReset()}>🔁</button>
        <button onClick={() => handleStop()}>⏸️</button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="gap-2 text-2xl">
          <button className="block" onClick={() => handleModifySeconds(-1)}>
            -1
          </button>
          <button className="block" onClick={() => handleModifySeconds(-5)}>
            -5
          </button>
        </div>
        <div className="text-7xl">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
        <div className="gap-2 text-2xl">
          <button className="block" onClick={() => handleModifySeconds(+1)}>
            +1
          </button>
          <button className="block" onClick={() => handleModifySeconds(+5)}>
            +5
          </button>
        </div>
      </div>
      <div>
        Wave {getWaveNumber(minutes, seconds)}, ~
        {getCreepsAtMinute(minutes, seconds)}cs
      </div>
      <div className="w-[350px] text-justify text-2xl">
        {eventsState.map((e, i) => (
          <div key={i}>
            {e.time[0].toString().padStart(2, "0")}:
            {e.time[1].toString().padStart(2, "0")} - {e.text}
          </div>
        ))}
      </div>
    </div>
  );
};

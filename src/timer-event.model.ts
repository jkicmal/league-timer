import { Nullable } from "./types";

interface TimerEvent {
  id: string;
  time: [number, number];
  text: string;
  voice: Nullable<TimerEventVoiceMetadata>;
}

interface TimerEventVoiceMetadata {
  text: string;
  time: [number, number];
  notified: boolean;
}

export const TIMER_EVENTS: TimerEvent[] = [
  {
    id: "first-wave",
    time: [1, 5],
    text: "First Wave",
    voice: null,
  },
  {
    id: "first-canon-wave",
    time: [2, 5],
    text: "First Canon",
    voice: null,
  },
  {
    id: "first-gank",
    time: [3, 0],
    text: "First Gank",
    voice: {
      text: "First gank in 30 seconds.",
      time: [2, 30],
      notified: false,
    },
  },
  {
    id: "first-dragon",
    time: [5, 0],
    text: "First Dragon",
    voice: {
      text: "Dragon in 30 seconds.",
      time: [4, 30],
      notified: false,
    },
  },
  {
    id: "first-void-grubs",
    time: [6, 0],
    text: "Void Grubs",
    voice: {
      text: "Void grubs in 30 seconds.",
      time: [5, 30],
      notified: false,
    },
  },
  {
    id: "first-honey-fruit",
    time: [6, 30],
    text: "Honey Fruit",
    voice: {
      text: "Honey fruit spawned.",
      time: [6, 30],
      notified: false,
    },
  },
  {
    id: "first-rift-herald",
    time: [16, 0],
    text: "Rift Herald",
    voice: {
      text: "Rift herald in 30 seconds.",
      time: [15, 30],
      notified: false,
    },
  },
  {
    id: "atakhan",
    time: [20, 0],
    text: "Atakhan",
    voice: {
      text: "Atakhan in 30 seconds.",
      time: [19, 30],
      notified: false,
    },
  },
  {
    id: "first-baron",
    time: [25, 0],
    text: "First Baron",
    voice: {
      text: "Baron in 30 seconds.",
      time: [24, 30],
      notified: false,
    },
  },
];

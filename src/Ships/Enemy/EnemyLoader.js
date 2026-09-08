//This code handles the dynamic generation of enemy characters
import {Pulse} from "../Enemy/Pulse.js"

export function loadPulse(canvasWidth, canvasHeight){
    return new Pulse(canvasWidth,Math.random()*canvasHeight);
}
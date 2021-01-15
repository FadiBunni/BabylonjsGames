import { Engine } from "@babylonjs/core/Engines/engine";
import {Game} from "./Game";


//Initialize Game
window.addEventListener('DOMContentLoaded', () => {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            if (Engine.isSupported()) {
                new Game('renderCanvas');
            }   
        }
    }
});

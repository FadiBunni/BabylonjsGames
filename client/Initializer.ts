import {Game} from "./Game";
import * as BABYLON from 'babylonjs';


window.addEventListener('DOMContentLoaded', () => {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            if (BABYLON.Engine.isSupported()) {
                new Game('renderCanvas');
            }
        }
    }
});

import * as OIMO from "oimo";
import * as BABYLON from 'babylonjs';
import {Game} from "./Game";

window.addEventListener('DOMContentLoaded', () => {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            if (BABYLON.Engine.isSupported()) {
                new Game('renderCanvas',OIMO);
            }
        }
    }
});

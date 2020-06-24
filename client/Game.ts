import * as Colyseus from "colyseus.js"
import {OimoJSPlugin, GradientBlock } from 'babylonjs';
import {Lights} from './src/Lights';
import {Camera} from './src/Camera';
import {Area} from './src/Area';
import {Player} from './src/Player';
import {ChatRoom} from './src/ChatRoom';


export class Game {
    private _canvas: any;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private lights: Lights;
    private camera: Camera;
    private area: Area;
    private player: Player;
    private gravity: number = -9.81;
    private client = new Colyseus.Client("ws://localhost:8080");

    constructor(canvasElement: string, OIMO: OimoJSPlugin) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.enablePhysics(new BABYLON.Vector3(0, this.gravity, 0), new BABYLON.OimoJSPlugin(undefined, OIMO));
        this._scene.debugLayer.show();


        this.lights = new Lights(this._scene);
        this.camera = new Camera(this._scene);
        this.area = new Area(this._scene);

        this.player = new Player(this._scene, this.lights, 2);
        new ChatRoom(this.client);
        
        this.run();
        
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    };

    public run(): void {
        this._engine.runRenderLoop(() => {
            let deltaTime: number = this._engine.getDeltaTime();
            //console.log(deltaTime);

            this.player.applyMovement(this.camera, deltaTime);
            this.camera.followCamera(this.player.playerMesh);
            this._scene.render();

            var fpsLabel = document.getElementById("fps_label");
            fpsLabel.innerHTML = this._engine.getFps().toFixed() + "FPS";
        });
    };
}
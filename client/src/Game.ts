import { Engine, Scene, OimoJSPlugin, Vector3 } from '@babylonjs/core' ;
import {Lights} from './Lights';
import {Camera} from './Camera';
import {Area} from './Area';
import {Player} from './Player';
import {ChatRoom} from './ChatRoom';
import * as Colyseus from 'colyseus.js';


export class Game {
    private _canvas: any;
    private _engine: Engine;
    private _scene:  Scene;
    private lights:  Lights;
    private camera:  Camera;
    private area: Area;
    private player: Player;
    private gravity: number = -9.81;
    private client = new Colyseus.Client("ws://localhost:8080");

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
        this._scene.enablePhysics(new Vector3(0, this.gravity, 0), new OimoJSPlugin(false));
        
        //for debug
        //this._scene.debugLayer.show();

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
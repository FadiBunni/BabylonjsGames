import {OimoJSPlugin } from 'babylonjs';
import {Lights} from './src/Lights';
import {Camera} from './src/Camera';
import {Area} from './src/Area';
import {Player} from './src/Player';



export class Game {
    private _canvas: any;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private lights: Lights;
    private camera: Camera;
    private area: Area;
    private player: Player;

    constructor(canvasElement: string, OIMO: OimoJSPlugin) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.enablePhysics(new BABYLON.Vector3(0, -20, 0), new BABYLON.OimoJSPlugin(undefined, OIMO));


        this.lights = new Lights(this._scene);
        this.camera = new Camera(this._scene);
        this.area = new Area(this._scene);
        
        this.player = new Player(this._scene, this.lights, "2");
       
        
        this.run();
        
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }

    public run(): void {
        this._engine.runRenderLoop(() => {
            let deltaTime: number = this._engine.getDeltaTime();
            //console.log(deltaTime);

            this.player.applyMovement(this.camera, deltaTime);
            this.camera.followCamera(this.player.playerMesh);
            this._scene.render();

            var fpsLabel = document.getElementById("fps_label");
            fpsLabel.innerHTML = this._engine.getFps().toFixed() + " fps";
        });
    }


}
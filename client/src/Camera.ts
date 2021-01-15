import {Scene, Vector3, ArcRotateCamera, Mesh } from '@babylonjs/core' ;


export class Camera {
    private _scene: Scene;
    private _camera: ArcRotateCamera;
    private _canvas: any;
    
    private followMesh: Mesh;
    private radius: number = 300;

    constructor(scene: Scene){
        this._scene = scene;
        this._canvas = scene.getEngine().getRenderingCanvas();
        this.init();
    }

    public init(): void{
        this._camera = new ArcRotateCamera('camera', 0,  1, 500, Vector3.Zero(), this._scene);
        this._camera.attachControl(this._canvas, true);
    }

    public getCamDirection(): Vector3{
        return this._camera.getTarget().subtract(this._camera.position).normalize();
    }

    public changeCameraRotation(deltaAlpha: number = null, deltaBeta: number = null): void{
        if(deltaAlpha !== null){
            let newAlpha: number = this._camera.alpha + deltaAlpha;
            this._camera.alpha = newAlpha;
        }
    }

    public followCamera(playerMesh: Mesh): void {
        this.followMesh = playerMesh;
        let newTarget: Vector3 = this.followMesh.position.clone();
        newTarget.y += 2;
        let alpha: number = this._camera.alpha;
        let beta: number = this._camera.beta;
        this._camera.target = newTarget;
        this._camera.lowerRadiusLimit = 10;
        this._camera.upperRadiusLimit = 1000;
        this._camera.alpha = alpha;
        this._camera.beta = beta;
    }
}
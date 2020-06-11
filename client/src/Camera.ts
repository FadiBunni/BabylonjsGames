export class Camera {
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _canvas: any;
    
    private followMesh: BABYLON.Mesh;
    private radius: number = 150;

    constructor(scene: BABYLON.Scene){
        this._scene = scene;
        this._canvas = scene.getEngine().getRenderingCanvas();
        this.init();
    }

    public init(){
        this._camera = new BABYLON.ArcRotateCamera('camera', 0,  1, 300, BABYLON.Vector3.Zero(), this._scene);
        this._camera.lowerRadiusLimit = 2;
        this._camera.upperRadiusLimit = 300;
        this._camera.attachControl(this._canvas, true);
    }

    public getCamDirection(): BABYLON.Vector3{
        return this._camera.getTarget().subtract(this._camera.position).normalize();
    }

    public changeCameraRotation(deltaAlpha: number = null, deltaBeta: number = null){
        if(deltaAlpha !== null){
            let newAlpha: number = this._camera.alpha + deltaAlpha;
            this._camera.alpha = newAlpha;
        }
    }

    public followCamera(playerMesh: BABYLON.Mesh) {
        this.followMesh = playerMesh;
        let newTarget: BABYLON.Vector3 = this.followMesh.position.clone();
        newTarget.y += 2;
        let alpha: number = this._camera.alpha;
        let beta: number = this._camera.beta;
        this._camera.target = newTarget;
        this._camera.radius = this.radius;
        this._camera.alpha = alpha;
        this._camera.beta = beta;
    }
}
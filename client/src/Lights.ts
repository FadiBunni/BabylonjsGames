import {Scene, Vector3, HemisphericLight, DirectionalLight, ShadowGenerator, Color3, AbstractMesh} from '@babylonjs/core' ;

export class Lights{
    private _scene: Scene;
    private light: HemisphericLight;
    private lightDirectional: DirectionalLight;
    private shadowGenerator: ShadowGenerator = null;

    constructor(scene: Scene){
        this._scene = scene;
        this.init();
    }

    public init(useShadowGenerator: boolean = true): void {
        this.light = new HemisphericLight('lightHL', new Vector3(0.2, 1, 0.2), this._scene);
        this.light.specular = new Color3(0.1, 0.1, 0.1);
        this.light.intensity = 0.9;

        this.lightDirectional = new DirectionalLight("lightDir", new Vector3(-2, -4, 2), this._scene);
        this.lightDirectional.diffuse = new Color3(0.2, 0.2, 0.2);
        this.lightDirectional.specular = new Color3(0, 0, 0);
        this.lightDirectional.position = new Vector3(250, 250, 0);
        this.lightDirectional.intensity = 1.5;

        if(useShadowGenerator){
            this.shadowGenerator = new ShadowGenerator(4192, this.lightDirectional);
        }
    }

    public addShadowCaster(mesh: AbstractMesh): void {
        this.shadowGenerator.getShadowMap().renderList.push(mesh);
    }

}
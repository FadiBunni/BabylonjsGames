import {Scene, PhysicsImpostor, StandardMaterial,  Ray, Texture, Mesh, Vector3,} from '@babylonjs/core' ;
import {Camera} from "./Camera";
import {Lights} from "./Lights";

const LEFT: number = 65 // A 
const RIGHT: number = 68 // D 
const UP: number = 87 // W 
const DOWN: number = 83 // S 
const JUMP: number = 32; // Spacebar 

// TODO: 
// -- The "keyCode" is deprecated, try using KeyboardEvent.Code or KeyboardEvent.Key


export class Player{
    private _scene: Scene;
    private _lights: Lights;
    private _camera: Camera;
    //keyDown and KeyFired "should" be object and not "any" but "object" conflicts with "noImplicitAny"
    private keyDown: any = {};
    private keyFired: any = {};
    public playerMesh: Mesh;
    public id: Number;

    constructor(scene: Scene, lights: Lights, id: Number) {
        this._scene = scene;
        this._lights = lights;
        this.id = id;
        
        this.init();
    }

    public init(): void{
        this.playerMesh = Mesh.CreateSphere("playerOBJ", 12, 10 , this._scene);
        this.playerMesh.position.y = 16;

        const playerMaterial = new StandardMaterial("playerMaterial", this._scene);
        playerMaterial.diffuseTexture = new Texture("assets/textures/green_tennis_ball.jpg",this._scene);
        this.playerMesh.material = playerMaterial;

        this.playerMesh.physicsImpostor = new PhysicsImpostor(
            this.playerMesh,
            PhysicsImpostor.SphereImpostor, {
                mass: 1,
                friction: 100,
                restitution: 0.35
            },
            this._scene
        );

        this._lights.addShadowCaster(this.playerMesh);

        window.addEventListener('keydown', (event: KeyboardEvent) => {this.keyDownEvt(event);},false);
        window.addEventListener('keyup', (event: KeyboardEvent) => {this.keyUpEvt(event);},false);
    }

    private keyDownEvt(evt: KeyboardEvent): void {
        if(!this.keyFired[evt.keyCode]){
            this.keyDown[evt.keyCode] = true;
            this.keyFired[evt.keyCode] = true;
        }
    }
 
    private keyUpEvt(evt: KeyboardEvent): void {
        this.keyDown[evt.keyCode] = false;
        this.keyFired[evt.keyCode] = false;
    }

    private isOnGround(): boolean{
        let isOnGround: boolean = false;

        let minY = this.playerMesh.getBoundingInfo().minimum.y + this.playerMesh.position.y;
        let pos = this.playerMesh.absolutePosition.clone();
        pos.y = minY;

        var ray: Ray = new Ray(this.playerMesh.absolutePosition, new Vector3(0, -1, 0));

        let info = this._scene.pickWithRay(ray, (mesh) => {
            return !(mesh === this.playerMesh);
        });
        
        if(info.hit){
            let pickedY = info.pickedPoint.y;
            isOnGround = (pickedY + 0.2) >= minY;
        }

        return isOnGround;
    }

    public applyMovement(camera: Camera, deltaTime: number): void{
        let contactPoint: Vector3 = this.playerMesh.absolutePosition.clone();
        contactPoint.y += 20;
        let force: number = 0.01 * deltaTime;
        let direction: Vector3 = camera.getCamDirection().multiplyByFloats(force, force, force);
        if(this.keyDown[UP]){
            this.playerMesh.applyImpulse(direction, contactPoint);
        }
        if(this.keyDown[DOWN]){
            this.playerMesh.applyImpulse(direction.negate(), contactPoint);
            //RouterService.sendInteraction(camera.getCamDirection().negate(), force);
        }
        if(this.keyDown[LEFT]){
            camera.changeCameraRotation(0.06);
        }
        if(this.keyDown[RIGHT]){
            camera.changeCameraRotation(-0.06);
        }
        if(this.keyDown[JUMP]){            
            this.keyDown[JUMP] = false;
            if(this.isOnGround()){
                console.log("jump!");
                let jump_direction = new Vector3(0, 1, 0);
                force = 40;
                let jump: Vector3 = jump_direction.multiplyByFloats(force, force, force);
                this.playerMesh.applyImpulse(jump, this.playerMesh.absolutePosition);
                //RouterService.sendInteraction(jump_direction, force);
           }
        }  
    }

    public update(linearVelocity: Vector3, angularVelocity: Vector3, position: Vector3): void{
        this.playerMesh.physicsImpostor.setAngularVelocity(angularVelocity);
        this.playerMesh.physicsImpostor.setLinearVelocity(linearVelocity);
        this.playerMesh.position = position;
    }
}
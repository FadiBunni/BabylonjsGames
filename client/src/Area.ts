export class Area{
    private _scene: BABYLON.Scene;
    private mesh: Array<BABYLON.Mesh> = [];

    constructor(scene: BABYLON.Scene){
        this._scene = scene;
        this.init();
    }

    public init(): void {

        //creating skybox
        let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10000.0}, this._scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", this._scene);
        skybox.position.y = 3000;
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture  = new BABYLON.CubeTexture("assets/textures/skybox", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        //creating a groundPlane
        const groundPlane = BABYLON.Mesh.CreateGround("ground", 10000, 10000, 2, this._scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this._scene,);
        const diffuseTexture = new BABYLON.Texture("assets/textures/floor.png", this._scene);
        diffuseTexture.uScale = 16;
        diffuseTexture.vScale = 16;
        groundMaterial.diffuseTexture = diffuseTexture;
        groundMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.65, 0.64);
        groundPlane.material = groundMaterial;
        this.mesh.push(groundPlane);

        //create a box in the center of the groundplane
        const centerBox = BABYLON.Mesh.CreateBox("centerBox", 40, this._scene);
        centerBox.position.y = -10;
        const centerBoxMaterial = new BABYLON.StandardMaterial("centerBoxMaterial", this._scene);
        centerBoxMaterial.diffuseColor = new BABYLON.Color3(0.36, 0.4, 0.4);
        centerBox.material = centerBoxMaterial;
        this.mesh.push(centerBox);

        //create walls for the game
        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", this._scene);
        wallMaterial.alpha = 0.4;

        const wallTop: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("wallTop", {width: 10000, height: 100, depth: 10}, this._scene);
        wallTop.material = wallMaterial;

        const wallBottom: BABYLON.Mesh = wallTop.clone("wallBottom");
        wallBottom.material = wallMaterial;

        const wallLeft: BABYLON.Mesh = wallTop.clone("wallLeft");
        wallLeft.material = wallMaterial;

        const wallRight: BABYLON.Mesh = wallTop.clone("wallRight");
        wallRight.material = wallMaterial;

        wallTop.position.z = 5000;
        wallBottom.position.z = -5000;

        wallLeft.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI/2);
        wallRight.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI/2);

        wallLeft.position.x = 5000;
        wallRight.position.x = -5000;

        this.mesh.push(wallTop);
        this.mesh.push(wallBottom);
        this.mesh.push(wallLeft);
        this.mesh.push(wallRight);

        this.mesh.forEach(element => {
            element.physicsImpostor = new BABYLON.PhysicsImpostor(
                element,
                BABYLON.PhysicsImpostor.BoxImpostor,{
                    mass: 0,
                    restitution: 0.3,
                    friction: 300
                }, 
                this._scene
            );
            element.receiveShadows = true;
        });
    }
}
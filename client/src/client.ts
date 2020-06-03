import * as BABYLON from 'babylonjs';

let canvas : any = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = new BABYLON.Scene(engine);

let positiony = 0;

//
// Camera
//
let camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
camera.setTarget(BABYLON.Vector3.Zero()); 
camera.attachControl(canvas, true);

//
// Lighting
//

let light0 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 3, -1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);

light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(0, 1, 0);

let light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 50, scene);

light1.diffuse = new BABYLON.Color3(1, 0, 0);
light1.specular = new BABYLON.Color3(0, 1, 0);

//
// Sphere
//
// let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
//    diameter: 2,
//    segments: 16
// }, scene);

let myBox = BABYLON.MeshBuilder.CreateBox("myBox", {height: 3, width: 2, depth: 1}, scene);
myBox.position = new BABYLON.Vector3(0,0,0);

// Animations
var alpha = 0;
scene.registerBeforeRender(function () {
    myBox.position.y = 100 * Math.sin(alpha);
    alpha += 0.001;
});


// let mat =  new BABYLON.StandardMaterial("mat", scene);
// mat.diffuseColor = new BABYLON.Color3(0.8, 0, 0);
// sphere.material = mat;

let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);	

engine.runRenderLoop(() => {
    scene.render();
})   

window.addEventListener( 'resize', () => {
    engine.resize();
})
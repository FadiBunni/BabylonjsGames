// import * as BABYLON from "@babylonjs/core";

// const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
// const engine = new BABYLON.Engine(canvas, true);

// const createScene = () => {
//     const scene = new BABYLON.Scene(engine);

//     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);

//     const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

//     // create houses
//     placeVillage(scene);

//     return scene;
// }

// const placeVillage = (scene: BABYLON.Scene) => {
//     // create ground
//     const ground = buildGround(scene);
//     const places = []; //each entry is an array [house type, rotation, x, z]
//     places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
//     places.push([2, -Math.PI / 16, -4.5, 3 ]);
//     places.push([2, -Math.PI / 16, -1.5, 4 ]);
//     places.push([2, -Math.PI / 3, 1.5, 6 ]);
//     places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
//     places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
//     places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
//     places.push([1, 5 * Math.PI / 4, 0, -1 ]);
//     places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
//     places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
//     places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
//     places.push([2, Math.PI / 1.9, 4.75, -1 ]);
//     places.push([1, Math.PI / 1.95, 4.5, -3 ]);
//     places.push([2, Math.PI / 1.9, 4.75, -5 ]);
//     places.push([1, Math.PI / 1.9, 4.75, -7 ]);
//     places.push([2, -Math.PI / 3, 5.25, 2 ]);
//     places.push([1, -Math.PI / 3, 6, 4 ]);

//     const detached_house = buildHouse(1, scene);
//     detached_house.rotation.y = -Math.PI / 16;
//     detached_house.position.x = -6.8;
//     detached_house.position.z = 2.5;

//     const semi_house = buildHouse(2, scene);
//     semi_house .rotation.y = -Math.PI / 16;
//     semi_house.position.x = -4.5;
//     semi_house.position.z = 3;

//     const houses = [];
//     for (let i = 0; i < places.length; i++) {
//         if (places[i][0] === 1) {
//             houses[i] = detached_house.createInstance("house" + i);
//         } else {
//             houses[i] = semi_house.createInstance("house" + i);
//         }
//         houses[i].rotation.y = places[i][1];
//         houses[i].position.x = places[i][2];
//         houses[i].position.z = places[i][3];
//     }

// }

// const buildGround = (scene: BABYLON.Scene) => {
//     const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 15, height:16});
//     // add green texture for ground
//     const material = new BABYLON.StandardMaterial("name", scene);
//     const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
//     groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
//     ground.material = groundMat; // this places the material on the ground
//     return ground;
// }

// const buildHouse = (width: number, scene: BABYLON.Scene) => {
//     // box
//     const boxMat = new BABYLON.StandardMaterial("roofMat", scene);
//     boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene);

//     let faceUV = [];
//     faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
//     faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
//     faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
//     faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
//     const box = BABYLON.MeshBuilder.CreateBox('box', {
//         wrap: true,
//         width: width,
//         faceUV: faceUV
//     }, scene);
//     box.material = boxMat;
//     box.position.y = 0.5;

//     // add roof
//     const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
//         diameter: 1.3,
//         height: 1.2,
//         tessellation: 3
//     });
//     roof.scaling.x = 0.75;
//     roof.scaling.y = width;
//     roof.rotation.z = Math.PI / 2;
//     roof.position.y = 1.22;
//     // add texture to roof
//     const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
//     roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
//     roof.material = roofMat;

//     // combine meshes and return house
//     const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
//     return house;
// }

// const scene = createScene();
// engine.runRenderLoop(function() {
//     scene.render();
// });

// window.addEventListener("resize", function() {
//     engine.resize();
// });
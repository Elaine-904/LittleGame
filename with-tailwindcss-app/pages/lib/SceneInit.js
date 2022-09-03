import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";


export default class SceneInit {
    
  constructor(canvasID, camera, scene, stats, controls, renderer, fov = 36, color) {
    this.fov = fov;
    this.scene = scene;
    this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.canvasID = canvasID;
  }


  initScene() {
    this.splitScreen = document.getElementById("splitScreen");
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.splitScreen.clientWidth / this.splitScreen.clientHeight,
      1,
      1000
    );

    this.camera.position.z = 128;
    // Init the scene
    this.scene = new THREE.Scene();
    // Set bg
    const BACKGROUND_COLOR = 0xf1f1f1;
    this.scene.background = new THREE.Color(BACKGROUND_COLOR );
    const canvas = document.getElementById(this.canvasID);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });


    this.renderer.setSize(
      this.splitScreen.clientWidth,
      this.splitScreen.clientHeight
    );
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  animate() {

    window.requestAnimationFrame(this.animate.bind(this));
    this.render();

    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {

    this.camera.aspect =
      this.splitScreen.clientWidth / this.splitScreen.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.splitScreen.clientWidth,
      this.splitScreen.clientHeight
    );
  }
}
import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import TicTacToe from "./lib/TicTacToe";


export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const ticTacToe = new TicTacToe();
    test.scene.add(ticTacToe.board);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
  
    const splitScreen = document.getElementById("splitScreen");
    function onMouseDown(event: { clientX: number; clientY: number; }) {
      // Half-screen
      // const splitScreen = document.getElementById("splitScreen");
      // mouse.x = (event.clientX / splitScreen.clientWidth) * 2 - 3;
      // mouse.y = -(event.clientY / splitScreen.clientHeight) * 2 + 1;
      // Full-screen
      mouse.x = (event.clientX / splitScreen.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / splitScreen.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const intersects = raycaster.intersectObjects(
        ticTacToe.hiddenTiles.children
      );
      console.log(intersects);
      if (intersects.length > 0) {
        const xOffset = intersects[0].object.position.x;
        const yOffset = intersects[0].object.position.y;
        ticTacToe.addCrossOrCircle(xOffset, yOffset);
        ticTacToe.checkWinConditions();
        const index = ticTacToe.hiddenTiles.children.findIndex(
          (c) => c.uuid === intersects[0].object.uuid
        );
        ticTacToe.hiddenTiles.children.splice(index, 1);
      }
      // NOTE: Demo ray being cast past objects.
      // for (let i = 0; i < intersects.length; i++) {
      //   intersects[i].object.material.wireframe =
      //     !intersects[i].object.material.wireframe;
      // }
    }

    window.addEventListener("mousedown", onMouseDown, false);

    const scaleUp = (obj: { scale: { x: number; y: number; z: number; }; }) => {
      if (obj.scale.x < 1) {
        obj.scale.x += 0.04;
      }
      if (obj.scale.y < 1) {
        obj.scale.y += 0.04;
      }
      if (obj.scale.z < 1) {
        obj.scale.z += 0.04;
      }
    };

    // NOTE: Animate board and player moves.
    const animate = () => {
      ticTacToe.boardLines.children.forEach(scaleUp);
      ticTacToe.circles.children.forEach(scaleUp);
      ticTacToe.crosses.children.forEach(scaleUp);
      ticTacToe.winLine.children.forEach(scaleUp);
      // ticTacToe.board.rotation.y += 0.002;
      requestAnimationFrame(animate);
    };
    animate();
  });

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Full-screen */}
      {/* <canvas id="myThreeJsCanvas" /> */}

      {/* Half-screen */}
 
      <div id="splitScreen" className="absolute h-full left-0 right-0">
        <canvas id="myThreeJsCanvas" className="absolute left-0" />
       </div>
    </div>
  );
}
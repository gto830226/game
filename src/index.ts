import "../style/index.scss";
import { Canvas } from "./core/canvas";
import { materialHandler as mh, ImageMaterial } from "./core/material";
import { Loading } from "./loading";
import { LayerHandler, Layer } from "./core/layer";
import { Camera } from "./core/camera";
// import { Background } from "./background";
// import { People } from "./people";
import { levelHandler } from "./core/level";
import { Level1 } from "./level/level1";

let registerMaterial = () => {
  mh.addMaterial("test", "image", "http://localhost:9527/assets/aigei3_com.png")
  mh.addMaterial("test2", "image", "http://localhost:9527/assets/aigei2_com.png")
  mh.addMaterial("map", "image", "http://localhost:9527/assets/map.jpg")
  mh.addMaterial("a", "image", "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("b", "image", "https://images.pexels.com/photos/220856/pexels-photo-220856.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("c", "image", "https://images.pexels.com/photos/170304/pexels-photo-170304.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("d", "image", "https://images.pexels.com/photos/236597/pexels-photo-236597.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("e", "image", "https://images.pexels.com/photos/576802/pexels-photo-576802.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("f", "image", "https://images.pexels.com/photos/767697/pexels-photo-767697.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("g", "image", "https://images.pexels.com/photos/166576/pexels-photo-166576.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("h", "image", "https://images.pexels.com/photos/129753/pexels-photo-129753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("i", "image", "https://images.pexels.com/photos/208848/pexels-photo-208848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
}


(async () => {
  registerMaterial();
  let cameraP1 = new Camera();
  let cameraP2 = new Camera();
  cameraP1.canvas = new Canvas(document.getElementById("drawer1") as HTMLCanvasElement)
  cameraP2.canvas = new Canvas(document.getElementById("drawer2") as HTMLCanvasElement)
  levelHandler.cameras = [cameraP1, cameraP2];
  levelHandler.nextLevel(Level1);
})();





import "../style/index.scss";
import { Canvas } from "./core/canvas";
import { materialHandler as mh, ImageMaterial } from "./core/material";
import { Loading } from "./core/loading";
import { LayerHandler, Layer } from "./core/layer";
import { Camera } from "./core/camera";
import { TestPeople } from "./test";
import { Background } from "./background";
import { TestPeople2 } from "./test2";





let loadMaterial = () => {
  mh.addMaterial("test", "image", "http://localhost:9527/assets/aigei3_com.png")
  mh.addMaterial("test2", "image", "http://localhost:9527/assets/aigei2_com.png")
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
  let canvasDom: HTMLCanvasElement = document.getElementById("drawer") as HTMLCanvasElement;
  loadMaterial();
  let camera = new Camera();
  camera.canvas = new Canvas(canvasDom)
  let loading = new Loading(mh.total);
  let layer = new Layer('載入畫面', [loading]);
  camera.handler = new LayerHandler([layer]);
  camera.handler.addLayer(layer);
  camera.start();
  let processSubscription = mh.process.subscribe(p => loading.progress = p);
  await mh.load();
  processSubscription.unsubscribe();
  layer.removeSprite(loading);
  let test = new TestPeople();
  let test2 = new TestPeople2();
  let back = new Background();
  layer.addSprite(back);
  layer.addSprite(test);
  layer.addSprite(test2);
})();


import "../style/index.scss";
import { Canvas } from "./canvas";
import { materialHandler as mh, ImageMaterial } from "./material";
// import { TestPeople } from "./test";
(async () => {
  let canvasDom: HTMLCanvasElement = document.getElementById("drawer") as HTMLCanvasElement;
  let canvas = new Canvas(canvasDom);
  mh.addMaterial("test", "image", "http://localhost:9527/assets/aigei3_com.png")
  mh.addMaterial("韋禮安", "image", "https://i.ytimg.com/an_webp/Fu_Ljynbxho/mqdefault_6s.webp?du=3000&sqp=CIrUkNMF&rs=AOn4CLCGm0tdGkcf9zWXdJPpPccsMgoCHg")
  await mh.load();
  let fps = 60;
  let image = mh.materials["test"] as ImageMaterial;
  // let people = new TestPeople();

})();
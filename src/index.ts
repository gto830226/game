import "../style/index.scss";
import { Canvas } from "./canvas";
import { materialHandler as mh, ImageMaterial } from "./material";
// import { TestPeople } from "./test";
(async () => {
  let canvasDom: HTMLCanvasElement = document.getElementById("drawer") as HTMLCanvasElement;
  let canvas = new Canvas(canvasDom);
  mh.addMaterial("test", "image", "http://localhost:9527/assets/aigei3_com.png")
  mh.addMaterial("韋禮安", "image", "https://i.ytimg.com/an_webp/Fu_Ljynbxho/mqdefault_6s.webp?du=3000&sqp=CIrUkNMF&rs=AOn4CLCGm0tdGkcf9zWXdJPpPccsMgoCHg")
  mh.addMaterial("a", "image", "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("b", "image", "https://images.pexels.com/photos/220856/pexels-photo-220856.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("c", "image", "https://images.pexels.com/photos/170304/pexels-photo-170304.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("d", "image", "https://images.pexels.com/photos/236597/pexels-photo-236597.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("e", "image", "https://images.pexels.com/photos/576802/pexels-photo-576802.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("f", "image", "https://images.pexels.com/photos/767697/pexels-photo-767697.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("g", "image", "https://images.pexels.com/photos/166576/pexels-photo-166576.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  mh.addMaterial("h", "image", "https://images.pexels.com/photos/129753/pexels-photo-129753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb")
  let val = 0;
  mh.process.subscribe(p => {
    console.log(`${p} / ${mh.total}`);
    val = p;
  });
  let fps = 60;
  setInterval(() => {
    canvas.fullRect("#FFF");
    canvas.ctx.fillStyle = "#333";
    let w = canvas.width * .8 / mh.total * val;
    canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, w, 6)
    canvas.ctx.font = "36pt Calibri";
    canvas.ctx.fillStyle = "#F00";
    let offset = canvas.ctx.measureText(`${val / mh.total}%`);
    canvas.ctx.fillText(`${Math.round(val * 100 / mh.total)}%`, (canvas.width - offset.width) / 2, canvas.height / 2);
  }, 1000 / fps);
  await mh.load();

  return;
})();


// let people = new TestPeople();
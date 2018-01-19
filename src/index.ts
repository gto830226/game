import "../style/index.scss";
import { Canvas } from "./canvas";
import { MaterialHandler } from "./material";
let main = async () => {
  let canvasDom: HTMLCanvasElement = document.getElementById("drawer") as HTMLCanvasElement;
  let canvas = new Canvas(canvasDom);
  canvas.ctx.fillStyle = "#FF0";
  canvas.ctx.fillRect(50, 50, 50, 50);
  let mh = new MaterialHandler()
  mh.addMaterial("林俊傑", "image", "https://i.ytimg.com/vi/L4lZVoXntpo/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAcHvLaMjaPEg4CHnTZFeEzbhohAQ")
  mh.addMaterial("小男孩", "image", "https://i.ytimg.com/an_webp/cBVnwhFTiRg/mqdefault_6s.webp?du=3000&sqp=CMDVh9MF&rs=AOn4CLB2O75rf9juRjFUPAjKAdDaX_LQig")
  await mh.load();
  canvas.ctx.drawImage(mh.materials["林俊傑"].data, 0, 0);
  canvas.ctx.drawImage(mh.materials["小男孩"].data, 200, 200);
}



main();

// setTimeout(() => {
//   canvas.clear();
// }, 3000)

// canvas.ctx.fillStyle = "#FFF";
// canvas.ctx.fillRect(0, 0, canvas.width, canvas.height)

// canvas.ctx.fillStyle = "#FF0";
// canvas.ctx.fillRect(50, 50, 50, 50)
// let src = "https://i.ytimg.com/vi/L4lZVoXntpo/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAcHvLaMjaPEg4CHnTZFeEzbhohAQ";
// let image = new ImageMaterial(src);
// image.loadMaterial().then(() => {
//   canvas.ctx.translate(canvas.width / 2, canvas.height / 2);
//   canvas.ctx.rotate(60 * Math.PI / 180);
//   canvas.ctx.drawImage(image.material, 0, 0);
//   canvas.ctx.translate(-canvas.width / 2, -canvas.height / 2);
// })

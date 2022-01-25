import "./styles.css";

const detail = {
  length: 350,
  width: 250,
  lt: {},
  lb: {},
  rt: { radius: 50 },
  rb: {}
};

{
  //your code here....
  const app = document.getElementById("app");
  const leftAngleInput = document.getElementById("leftAngleInput");
  const rotateZ = document.getElementById("rotateZ");

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  app.append(canvas);
  canvas.width = 900;
  canvas.height = 900;

  const defaultAngle = 90;

  ctx.translate(canvas.width / 2 - 200, canvas.height / 2 - 250);

  function drawDetail(detail, angle) {
    const { width, length } = detail;
    const rt = +leftAngleInput.value || detail.rt.radius || 0;
    const rb = detail.rb.radius || 0;
    const lb = detail.lb.radius || 0;
    const lt = detail.lt.radius || 0;

    ctx.rotate(Math.PI / 180 * angle);
    ctx.clearRect(-length, -width, canvas.height, canvas.width)
    ctx.beginPath();
    ctx.moveTo(-length / 2 + 150, -width / 2);
    ctx.arcTo(length / 2, -width / 2, length / 2, width / 2, rt);
    ctx.arcTo(length / 2, width / 2, -length, width / 2, rb);
    ctx.arcTo(-length / 2, width / 2, -length / 2, -width / 2, lb);
    ctx.arcTo(-length / 2, -width / 2, length / 2, -width / 2, lt);
    ctx.closePath()

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawDetail(detail, defaultAngle - 90);

  leftAngleInput.addEventListener('input', (event) => {
    const radius = +event.target.value;
    if (isNaN(radius) || radius < 0 || radius > 200) return;
    const newDetail = { ...detail, rt: { radius } };
    drawDetail(newDetail, defaultAngle - 90);

  })
  rotateZ.addEventListener('click', () => {
    drawDetail(detail, defaultAngle)
  })
}


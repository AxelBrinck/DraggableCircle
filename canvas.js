// **********************************************************
// * basic code to have a draggable circle in a web canvas. *
// * axel brinck.                                           *
// **********************************************************



// global variables and configuration. ****************************************
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let dragging = false;
const circle = {
    x: 300, 
    y: 300,
    r: 20,
}
// ****************************************************************************



// the only math needed for this. *********************************************
function distanceBetweenTwoPoints(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
}

function isPointInsideCircle(ax, ay, bx, by, r) {
    return distanceBetweenTwoPoints(ax, ay, bx, by) <= r;
}
// ****************************************************************************



// mouse triggers *************************************************************
canvas.addEventListener("mouseup", () => {
    dragging = false; // Whenever a mouse up occurs, we release any drag.
});

canvas.addEventListener("mousedown", (event) => {
    dragging = isPointInsideCircle(
            event.clientX, event.clientY, 
            circle.x, circle.y, circle.r);
});

// when moving the mouse, if we are dragging, update the circle coordinates.
document.onmousemove = function (e) {
    if (dragging) {
        circle.x = e.clientX;
        circle.y = e.clientY;

        // Redraw canvas.
        requestAnimationFrame(refresh);
    }
 };
// ****************************************************************************



// canvas draw ****************************************************************
function refresh() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.stroke();

}
requestAnimationFrame(refresh);
// ****************************************************************************



// Resizing canvas upon window resize, ****************************************
function resizeCanvas() {
    canvas.setAttribute('width', document.documentElement.clientWidth);
    canvas.setAttribute('height', document.documentElement.clientHeight);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvas);

// At document opening, there is no resize event, so we must manually call it:
resizeCanvas(); 
// ****************************************************************************
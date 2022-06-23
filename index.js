(function () {
  var COLORS,
    Confetti,
    NUM_CONFETTI,
    PI_2,
    canvas,
    confetti,
    context,
    drawCircle,
    i,
    range,
    resizeWindow,
    xpos;

  NUM_CONFETTI = 350;

  COLORS = [
    [85, 71, 106],
    [174, 61, 99],
    [219, 56, 83],
    [244, 92, 68],
    [248, 182, 70],
  ];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("confetti");
  context = canvas.getContext("2d");

  window.w = 0;
  window.h = 0;

  resizeWindow = function () {
    window.w = canvas.width = window.innerWidth;
    return (window.h = canvas.height = window.innerHeight);
  };

  window.addEventListener("resize", resizeWindow, false);

  window.onload = function () {
    return setTimeout(resizeWindow, 0);
  };

  range = function (a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function (x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.4;

  document.onmousemove = function (e) {
    return (xpos = e.pageX / w);
  };

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  Confetti = (function () {
    function Confetti() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb =
        "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function () {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return (this.vy = 0.7 * this.r + range(-1, 1));
    };

    Confetti.prototype.draw = function () {
      var _ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!(0 < (_ref = this.x) && _ref < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(
        ~~this.x,
        ~~this.y,
        this.r,
        "" + this.rgb + "," + this.opacity + ")"
      );
    };

    return Confetti;
  })();

  confetti = (function () {
    var _i, _results;
    _results = [];
    for (
      i = _i = 1;
      1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI;
      i = 1 <= NUM_CONFETTI ? ++_i : --_i
    ) {
      _results.push(new Confetti());
    }
    return _results;
  })();

  window.step = function () {
    var c, _i, _len, _results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    _results = [];
    for (_i = 0, _len = confetti.length; _i < _len; _i++) {
      c = confetti[_i];
      _results.push(c.draw());
    }
    return _results;
  };

  step();
}.call(this));

(function () {
  window.onload = function () {
    //functions definition

    //class definition
    class segm {
      constructor(x, y, l) {
        this.b = Math.random() * 1.9 + 0.1;
        this.x0 = x;
        this.y0 = y;
        this.a = Math.random() * 2 * Math.PI;
        this.x1 = this.x0 + l * Math.cos(this.a);
        this.y1 = this.y0 + l * Math.sin(this.a);
        this.l = l;
      }
      update(x, y) {
        this.x0 = x;
        this.y0 = y;
        this.a = Math.atan2(this.y1 - this.y0, this.x1 - this.x0);
        this.x1 = this.x0 + this.l * Math.cos(this.a);
        this.y1 = this.y0 + this.l * Math.sin(this.a);
      }
    }
    class rope {
      constructor(tx, ty, l, b, slq, typ) {
        if (typ == "l") {
          this.res = l / 2;
        } else {
          this.res = l / slq;
        }
        this.type = typ;
        this.l = l;
        this.segm = [];
        this.segm.push(new segm(tx, ty, this.l / this.res));
        for (let i = 1; i < this.res; i++) {
          this.segm.push(
            new segm(
              this.segm[i - 1].x1,
              this.segm[i - 1].y1,
              this.l / this.res
            )
          );
        }
        this.b = b;
      }
      update(t) {
        this.segm[0].update(t.x, t.y);
        for (let i = 1; i < this.res; i++) {
          this.segm[i].update(this.segm[i - 1].x1, this.segm[i - 1].y1);
        }
      }
      show() {
        if (this.type == "l") {
          c.beginPath();
          for (let i = 0; i < this.segm.length; i++) {
            c.lineTo(this.segm[i].x0, this.segm[i].y0);
          }
          c.lineTo(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1
          );
          c.strokeStyle = "white";
          c.lineWidth = this.b;
          c.stroke();

          c.beginPath();
          c.arc(this.segm[0].x0, this.segm[0].y0, 1, 0, 2 * Math.PI);
          c.fillStyle = "white";
          c.fill();

          c.beginPath();
          c.arc(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1,
            2,
            0,
            2 * Math.PI
          );
          c.fillStyle = "white";
          c.fill();
        } else {
          for (let i = 0; i < this.segm.length; i++) {
            c.beginPath();
            c.arc(
              this.segm[i].x0,
              this.segm[i].y0,
              this.segm[i].b,
              0,
              2 * Math.PI
            );
            c.fillStyle = "white";
            c.fill();
          }
          c.beginPath();
          c.arc(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1,
            2,
            0,
            2 * Math.PI
          );
          c.fillStyle = "white";
          c.fill();
        }
      }
    }

    //setting up canvas
    let c = init("mouse-pointer").c,
      canvas = init("mouse-pointer").canvas,
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      ropes = [];

    //variables definition
    let nameOfVariable = "value",
      mouse = {},
      last_mouse = {},
      rl = 50,
      randl = [],
      target = { x: w / 2, y: h / 2 },
      last_target = {},
      t = 0,
      q = 10,
      da = [],
      type = "l";

    for (let i = 0; i < 100; i++) {
      if (Math.random() > 0.25) {
        type = "l";
      } else {
        type = "o";
      }
      ropes.push(
        new rope(
          w / 2,
          h / 2,
          (Math.random() * 1 + 0.5) * 500,
          Math.random() * 0.4 + 0.1,
          Math.random() * 15 + 5,
          type
        )
      );
      randl.push(Math.random() * 2 - 1);
      da.push(0);
    }

    //place for objects in animation
    function draw() {
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }

      target.x += target.errx / 10;
      target.y += target.erry / 10;

      t += 0.01;

      for (let i = 0; i < ropes.length; i++) {
        if (randl[i] > 0) {
          da[i] += (1 - randl[i]) / 10;
        } else {
          da[i] += (-1 - randl[i]) / 10;
        }
        ropes[i].update({
          x:
            target.x +
            randl[i] * rl * Math.cos((i * 2 * Math.PI) / ropes.length + da[i]),
          y:
            target.y +
            randl[i] * rl * Math.sin((i * 2 * Math.PI) / ropes.length + da[i]),
        });
        ropes[i].show();
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }

    //mouse position
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });

    //animation frame
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }

    //window resize
    window.addEventListener("resize", function () {
      (w = canvas.width = window.innerWidth),
        (h = canvas.height = window.innerHeight);
      loop();
    });

    //animation runner
    loop();
    setInterval(loop, 1000 / 60);
  };
})();

var clock;
var $clock = $(".clock");
var $message = $(".message");
var $confetti = $("#confetti");

$(document).ready(function () {
  var currentDate = new Date();
  var getLicenseDate = "2021-05-06 12:00:00";
  var startDate = new Date(getLicenseDate.replace(/-/g, "/"));
  var diff = currentDate.getTime() / 1000 - startDate.getTime() / 1000;

  clock = $clock.FlipClock(diff, {
    clockFace: "DailyCounter",
    countdown: false,
    // callbacks: {
    //   interval: function () {
    //     var time = this.factory.getTime().time;

    //     if (time === 10) {
    //       $(".countdown_mp3").trigger("play");
    //     }

    //     console.log(time);

    //     if (time <= 10 && time > 0) {
    //       pulse();
    //     } else if (time <= 0) {
    //       celebrate();
    //     }
    //   },
    // },
  });
});

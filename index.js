// Cloud canvas back
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

// Clock JS handler
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

// Mouse pointer canvas
(function () {
  window.onload = function () {
    // 如果是移动端则放开鼠标 canvas
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
        navigator.userAgent
      )
    )
      return;
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

// Cplayer Plugin
(function () {
  const player = new cplayer({
    element: document.getElementById("cplayer"),
    dark: true,
    autoplay: true,
    playlist: [
      {
        src: "./assets/media/renshijian.mp3",
        poster: "./assets/media/renshijian.jpeg",
        name: "人世间",
        artist: "雷佳",
        lyric:
          "[00:00.000] 作词 : 唐恬\n[00:01.000] 作曲 : 钱雷\n[00:02.000] 编曲 : 钱雷\n[00:03.000] 制作人 : 钱雷\n[00:29.37]草木会发芽孩子会长大\n[00:36.75]岁月的列车不为谁停下\n[00:43.92]命运的站台悲欢离合都是刹那\n[00:51.36]人像雪花一样飞很高又融化\n[00:58.44]世间的苦啊爱要离散雨要下\n[01:05.64]世间的甜啊走多远都记得回家\n[01:13.02]平凡的我们撑起屋檐之下一方烟火\n[01:21.63]不管人世间多少沧桑变化\n[01:27.24]祝你踏过千重浪\n[01:30.48]能留在爱人的身旁\n[01:34.08]在妈妈老去的时光\n[01:37.68]听她把儿时慢慢讲\n[01:41.37]也祝你不忘少年样\n[01:45.03]也无惧那白发苍苍\n[01:48.69]若年华终将被遗忘记得你我\n[01:59.94]火一样爱着\n[02:07.11]人世间值得\n[02:10.98]Wu~~~~~~\n[02:36.66]有多少苦乐就有多少种活法\n[02:43.89]有多少变化太阳都会升起落下\n[02:51.18]平凡的我们一身雨雪风霜不问去哪\n[02:59.76]随四季枯荣依然迎风歌唱\n[03:05.46]祝你踏过千重浪\n[03:08.52]能留在爱人的身旁\n[03:12.27]在妈妈老去的时光\n[03:15.96]听她把儿时慢慢讲\n[03:19.59]也祝你不忘少年样\n[03:23.19]也无惧那白发苍苍\n[03:26.85]我们啊像种子一样\n[03:31.05]一生向阳\n[03:38.01]在这片土壤\n[03:47.10]随万物生长\n[03:49.643] 弦乐编写 : 胡静成\n[03:52.276] 大提琴 : 郎莹\n[03:54.909] 弦乐 : 国际首席爱乐乐团\n[03:57.542] 弦乐录音 : 王小四@金田录音棚\n[04:00.175] 吉他 : 高飞\n[04:02.808] 配唱编写 : 钱雷\n[04:05.441] 人声录音 : 杨惠琳@Studio 21A\n[04:08.074] 人声录音室 : Studio 21A Beijing\n[04:10.707] Vocal edited : 汝文博@SBMS Beijing\n[04:13.340] 混音&母带 : 赵靖BIG.J@SBMS Beijing\n",
        sublyric: "",
      },
    ],
  });
})();

// Snow canvas
// (function () {
//   var c = document.getElementById("snow"),
//     $ = c.getContext("2d");
//   var w = (c.width = window.innerWidth),
//     h = (c.height = window.innerHeight);

//   Snowy();
//   function Snowy() {
//     var snow,
//       arr = [];
//     var num = 600,
//       tsc = 1,
//       sp = 1;
//     var sc = 1.3,
//       t = 0,
//       mv = 20,
//       min = 1;
//     for (var i = 0; i < num; ++i) {
//       snow = new Flake();
//       snow.y = Math.random() * (h + 50);
//       snow.x = Math.random() * w;
//       snow.t = Math.random() * (Math.PI * 2);
//       snow.sz = (100 / (10 + Math.random() * 100)) * sc;
//       snow.sp = Math.pow(snow.sz * 0.8, 2) * 0.15 * sp;
//       snow.sp = snow.sp < min ? min : snow.sp;
//       arr.push(snow);
//     }
//     go();
//     function go() {
//       window.requestAnimationFrame(go);
//       $.clearRect(0, 0, w, h);
//       $.fillStyle = "hsla(242, 95%, 3%, 1)";
//       $.fillRect(0, 0, w, h);
//       $.fill();
//       for (var i = 0; i < arr.length; ++i) {
//         f = arr[i];
//         f.t += 0.05;
//         f.t = f.t >= Math.PI * 2 ? 0 : f.t;
//         f.y += f.sp;
//         f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
//         if (f.y > h + 50) f.y = -10 - Math.random() * mv;
//         if (f.x > w + mv) f.x = -mv;
//         if (f.x < -mv) f.x = w + mv;
//         f.draw();
//       }
//     }
//     function Flake() {
//       this.draw = function () {
//         this.g = $.createRadialGradient(
//           this.x,
//           this.y,
//           0,
//           this.x,
//           this.y,
//           this.sz
//         );
//         this.g.addColorStop(0, "hsla(255,255%,255%,1)");
//         this.g.addColorStop(1, "hsla(255,255%,255%,0)");
//         $.moveTo(this.x, this.y);
//         $.fillStyle = this.g;
//         $.beginPath();
//         $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
//         $.fill();
//       };
//     }
//   }
//   /*________________________________________*/
//   window.addEventListener(
//     "resize",
//     function () {
//       c.width = w = window.innerWidth;
//       c.height = h = window.innerHeight;
//     },
//     false
//   );
// })();

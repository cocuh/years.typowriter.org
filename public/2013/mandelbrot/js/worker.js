// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  var burning, mandelbro;

  mandelbro = function(cr, ci, maxrad, maxtry) {
    var i, n, ti, tr, zi, zr;
    zr = 0;
    zi = 0;
    tr = 0;
    ti = 0;
    n = 0;
    while (n < maxtry && (tr + ti) <= maxrad) {
      zi = 2 * zr * zi + ci;
      zr = tr - ti + cr;
      tr = zr * zr;
      ti = zi * zi;
      n++;
    }
    i = 0;
    while (i < 3) {
      zi = 2 * zr * zi + ci;
      zr = tr - ti + cr;
      tr = zr * zr;
      ti = zi * zi;
      i++;
    }
    return [n, tr, ti];
  };

  burning = function(cr, ci, maxrad, maxtry) {
    var i, n, ti, tr, zi, zr;
    zr = 0;
    zi = 0;
    tr = 0;
    ti = 0;
    n = 0;
    while (n < maxtry && (tr + ti) <= maxrad) {
      zi = 2 * Math.abs(zr) * Math.abs(zi) - ci;
      zr = tr - ti + cr;
      tr = zr * zr;
      ti = zi * zi;
      n++;
    }
    i = 0;
    while (i < 3) {
      zi = 2 * zr * zi + ci;
      zr = tr - ti + cr;
      tr = zr * zr;
      ti = zi * zi;
      i++;
    }
    return [n, tr, ti];
  };

  this.onmessage = function(inp) {
    var calc, d, dx, maxrad, maxtry, n, res, settype, width, xmin, y;
    d = inp.data;
    y = d.y;
    xmin = d.xmin;
    dx = d.dx;
    width = d.width;
    maxrad = d.maxrad;
    maxtry = d.maxtry;
    settype = d.settype;
    switch (settype) {
      case 0:
        calc = mandelbro;
        break;
      case 1:
        calc = burning;
        break;
      default:
        calc = mandelbro;
    }
    n = 0;
    res = [];
    while (n < width) {
      res[n] = calc(xmin + dx * n, y, maxrad, maxtry);
      n++;
    }
    return postMessage({
      canvas_y: d.canvas_y,
      worker_id: d.worker_id,
      y: d.y,
      res: res
    });
  };

}).call(this);

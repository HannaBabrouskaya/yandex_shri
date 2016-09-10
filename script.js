var duration = 500,
      circleCount = 150,
      coordinates = [];

  var win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = (win.innerWidth || e.clientWidth || g.clientWidth) * 0.98,
      h = (win.innerHeight || e.clientHeight || g.clientHeight) * 0.98;

  var dataset = [];

  for (var i = 0; i < circleCount; i++) {
    var color = Math.round(Math.random());
    var firstValue = Math.floor(Math.random() * w);
    var secondValue = Math.floor(Math.random() * h);
    dataset.push([firstValue, secondValue, color]);
  }

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return d[0];
      })
      .attr("cy", function (d) {
        return d[1];
      })
      .attr("fill", "orange", function (d) {
        return d;
      })
      .attr("r", function (d) {
        return Math.sqrt(h - d[1]);
      });

  svg.on("mousemove", mousemove);

  function mousemove(d, i) {
    coordinates = d3.mouse(this);
  }

  function circleMovement() {
    var dataLength = dataset.length,
        range = 100,
        radius = range * 2;
    var rand = Math.floor(Math.random() * range);

    for (var i = 0; i < dataLength; i++) {
      if (Math.sqrt(Math.pow(Math.abs(coordinates[0] - dataset[i][0]), 2) + Math.pow(Math.abs(coordinates[1] - dataset[i][1]), 2)) < radius) {
        if (coordinates[0] - dataset[i][0] >= 0) {
          if (coordinates[1] - dataset[i][1] >= 0) {
            dataset[i][0] = dataset[i][0] - rand / 2;
            dataset[i][1] = dataset[i][1] - rand / 2;
          } else {
            dataset[i][0] = dataset[i][0] - rand / 2;
            dataset[i][1] = dataset[i][1] + rand / 2;
          }
        } else {
          if (coordinates[1] - dataset[i][1] >= 0) {
            dataset[i][0] = dataset[i][0] + rand / 2;
            dataset[i][1] = dataset[i][1] - rand / 2;
          } else {
            dataset[i][0] = dataset[i][0] + rand / 2;
            dataset[i][1] = dataset[i][1] + rand / 2;
          }
        }
      } else {
        if ((dataset[i][0] + range / 2) > w) {
          dataset[i][0] = dataset[i][0] - rand / 2;
        } else {
          if (dataset[i][0] < range / 2) {
            dataset[i][0] = dataset[i][0] + rand / 2;
          } else {
            dataset[i][0] = dataset[i][0] + Math.floor(Math.random() * range) - range / 2;
          }
        }
        if ((dataset[i][1] + range / 2) > w) {
          dataset[i][1] = dataset[i][1] - rand / 2;
        } else {
          if (dataset[i][1] < range / 2) {
            dataset[i][1] = dataset[i][1] + rand / 2;
          } else {
            dataset[i][1] = dataset[i][1] + Math.floor(Math.random() * range) - range / 2;
          }
        }
      }
      if (dataset[i][2] == 0) {
        dataset[i][2] = 1;
      } else {
        dataset[i][2] = 0;
      }
    }

    svg.selectAll("circle")
        .data(dataset)
        .transition()
        .ease("linear")
        .duration(duration)
        .attr("cx", function (d) {
          return d[0];
        })
        .attr("cy", function (d) {
          return d[1];
        })
        .attr("fill", function (d) {
          if (d[2] == 1) {
            return "yellow";
          } else {
            return "red";
          }
        });
  }

  setInterval(function () {
    circleMovement();
  }, duration);
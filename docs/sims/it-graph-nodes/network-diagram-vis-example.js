var nodes = null;
var edges = null;
var network = null;

// Icon directory with trailing slash which contains the SVG bootstrap icons to use for nodes.
var DIR = "../../it-icons/";
var EDGE_LENGTH_MAIN = 150;
var EDGE_LENGTH_SUB = 50;

// Called when the Visualization API is loaded.
function draw() {
  // Create a data table with nodes.
  nodes = [];

  // Create a data table with links.
  edges = [];

  nodes.push({
    id: 1,
    label: "Main",
    image: DIR + "Network-Pipe-icon.png",
    shape: "image",
    opacity: 0.7,
  });
  nodes.push({
    id: 2,
    label: "Office",
    image: DIR + "Network-Pipe-icon.png",
    shape: "image",
  });
  nodes.push({
    id: 3,
    label: "Wireless",
    image: DIR + "Network-Pipe-icon.png",
    shape: "image",
  });
  nodes.push({ id: 22, label: "Normal", opacity: 1 });
  edges.push({ from: 1, to: 2, length: EDGE_LENGTH_MAIN });
  edges.push({ from: 1, to: 3, length: EDGE_LENGTH_MAIN });
  edges.push({ from: 1, to: 22, length: EDGE_LENGTH_MAIN });

  for (var i = 4; i <= 7; i++) {
    nodes.push({
      id: i,
      label: "Computer",
      image: DIR + "Hardware-My-Computer-3-icon.png",
      shape: "image",
      group: "computer",
      opacity: 1,
    });
    edges.push({ from: 2, to: i, length: EDGE_LENGTH_SUB });
  }

  nodes.push({
    id: 101,
    label: "Printer",
    image: DIR + "Hardware-Printer-Blue-icon.png",
    shape: "image",
  });
  edges.push({ from: 2, to: 101, length: EDGE_LENGTH_SUB });

  nodes.push({
    id: 102,
    label: "Laptop",
    image: DIR + "Hardware-Laptop-1-icon.png",
    shape: "image",
  });
  edges.push({ from: 3, to: 102, length: EDGE_LENGTH_SUB });

  nodes.push({
    id: 103,
    label: "network drive",
    image: DIR + "Network-Drive-icon.png",
    shape: "image",
  });
  edges.push({ from: 1, to: 103, length: EDGE_LENGTH_SUB });

  nodes.push({
    id: 104,
    label: "Internet",
    image: DIR + "System-Firewall-2-icon.png",
    shape: "image",
  });
  edges.push({ from: 1, to: 104, length: EDGE_LENGTH_SUB });

  for (var i = 200; i <= 201; i++) {
    nodes.push({
      id: i,
      label: "Smartphone",
      image: DIR + "Hardware-My-PDA-02-icon.png",
      shape: "image",
    });
    edges.push({ from: 3, to: i, length: EDGE_LENGTH_SUB });
  }

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    // nodes: {
    //   opacity: .5
    // },
    groups: {
      computer: {
        opacity: 0.3,
      },
    },
  };
  network = new vis.Network(container, data, options);
}

window.addEventListener("load", () => {
  draw();
});

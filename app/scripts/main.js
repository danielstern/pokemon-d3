var diameter = 2000,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


d3.json("pokemon.json", function(error, root) {
	console.table(root);
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
      // .each(function(d))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
      	return "translate(" + d.attack * 10 + "," + d.defense * 10 + ")"; 
      });

  node.append("title")
      .text(function(d) {
       // return d.className + ": " + format(d.value); 
       return d.name + ":: attack: " + d.attack;
   });

  node.append("circle")
      .attr("r", function(d) { 
      	// debugger;
      	return d.attack / 2;
      })
      .style("fill", function(d) {
         switch(d.type) {
        	case "fire":
        		return "red";
        	break;
        	case "grass":
        		return "green";
        	break;
        	case "water":
        		return "dodgerblue";
        	break;
        	case "electric":
        		return "yellow";
        	break;
        	case "ice":
        		return "white";
        	break;
        	case "normal":
        		return "grey";
        	break;
        	case "ghost":
        		return "pink";
        	break;
        	case "fighting":
        		return "sienna";
        	break;
        	case "psychic":
        		return "purple";
        	break;
        	case "rock":
        		return "teal";
        	break;
        	case "ground":
        		return "brown";
        	break;
        	case "dragon":
        		return "orange";
        	break;
        	case "poison":
        		return "chocolate";
        	break;
        	case "bug":
        		return "lawngreen";
        	break;
        }
       // return color(d.type); 
       // retirm c
   });

  node.append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name; });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
  	// debugger;/
  	_.each(node,function(pokemon){
  		// debugger;
  		classes.push(pokemon)
  	})
    // if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    // else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
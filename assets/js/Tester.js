$(function() {
	var btnInit = $("#btn-init");
	var btnNext = $("#btn-next");
	var btnPlay = $("#btn-play");

	btnInit.click(function() {
		gm.init();
		btnNext.removeClass("disabled");
		btnPlay.removeClass("disabled");
	});

	btnNext.click(function() {
		gm.start(true);
	});

	btnPlay.click(function() {
		gm.start();
	});

	// Create the tables
	$("#board-0 tbody").append(createTable(0, "left"));
	$("#board-1 tbody").append(createTable(1, "right"));
});

function createTable(index, side) {
	var tableBody = "";

	for (var i = 0; i < HEIGHT; i++) {
		var row = "<tr>";

		if (side == "left") {
			row += "<th>" + i + "</th>";
		}

		for (var j = 0; j < WIDTH; j++) {
			row += "<td id='" + index + "-" + j + "," + i + "'></td>";
		}

		if (side == "right") {
			row += "<th>" + i + "</th>";
		}

		row += "</tr>";

		tableBody += row;
	}

	return tableBody;
}
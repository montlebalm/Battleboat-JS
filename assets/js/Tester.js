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
});
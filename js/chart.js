$(".chart").click(function() {
	$(".popup").css({"top": $(window).scrollTop() + 100}).addClass("active");
	$(".bg-popup").fadeIn();
	$(".close-icon").fadeIn();

	$(".bg-popup").click(function() {
		$(".popup").removeClass("active");
		$(".bg-popup").fadeOut();
		$(".close-icon").fadeOut();
	});

	$(".close-icon").click(function() {
		$(".popup").removeClass("active");
		$(".bg-popup").fadeOut();
		$(".close-icon").fadeOut();
	});

});

$(window).scroll(function() {
	$(".popup").css({"top": $(window).scrollTop() + 100})
}).scroll();

function showChart(data) {
	
	let dataUsersGender = [];
	let male = 0;
	let female = 0;

	for (var i = 0; i < data.length; i++) {
		const { gender } = data[i];
		if (gender == 'male') {
			male += 1;
		} else {
			female += 1;
		}	
	}

// CHART
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Set data
var selected;
var types = [{
	type: "Male",
	percent: male,
	color: chart.colors.getIndex(0),
}, {
	type: "Female",
	percent: female,
	color: chart.colors.getIndex(1),
}];

// Add data
chart.data = generateChartData();

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "percent";
pieSeries.dataFields.category = "type";
pieSeries.slices.template.propertyFields.fill = "color";
pieSeries.slices.template.propertyFields.isActive = "pulled";
pieSeries.slices.template.strokeWidth = 0;

function generateChartData() {
	var chartData = [];
	for (var i = 0; i < types.length; i++) {
		if (i == selected) {
			for (var x = 0; x < types[i].subs.length; x++) {
				chartData.push({
					type: types[i].subs[x].type,
					percent: types[i].subs[x].percent,
					color: types[i].color,
					pulled: true
				});
			}
		} else {
			chartData.push({
				type: types[i].type,
				percent: types[i].percent,
				color: types[i].color,
				id: i
			});
		}
	}
	return chartData;
}

pieSeries.slices.template.events.on("hit", function(event) {
	if (event.target.dataItem.dataContext.id != undefined) {
		selected = event.target.dataItem.dataContext.id;
	} else {
		selected = undefined;
	}
	chart.data = generateChartData();
});
}
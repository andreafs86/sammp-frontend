// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'timeline', 'calendar'], 'language': 'pt'});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

var massa = [];

function drawChart() {

    if(massa && massa.length > 0 && google && google.visualization && google.visualization.Timeline){
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Position' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'string', role: 'tooltip', p: {html: true}})
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        
        dataTable.addRows(massa[0]);
        
        var options = {
            title: 'Mudanças',
            width: 1100,
            height: 1000,
            hAxis: {
                format: 'dd/MM'
            },
            axes: {
                x: {
                    0: { side: 'top'}
                }
            },
            timeline: { colorByRowLabel: true }
        };
    
        var chart = new google.visualization.Timeline(document.getElementById('chart_div'));
    
        google.visualization.events.addListener(chart, 'ready', afterDraw);

        chart.draw(dataTable, options);
    }
}

function afterDraw() {
    var g = document.getElementsByTagName("svg")[2].getElementsByTagName("g")[1];
  document.getElementsByTagName("svg")[2].parentNode.style.top = '40px';
  document.getElementsByTagName("svg")[2].style.overflow = 'visible';
  var height = Number(g.getElementsByTagName("text")[0].getAttribute('y')) + 15;
  g.setAttribute('transform','translate(0,-'+height+')');
  g = null;
}

function drawChartWithAngular(params){
    massa = params;

    drawChart();
}
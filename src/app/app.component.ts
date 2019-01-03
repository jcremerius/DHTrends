import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as d3 from 'd3';
import { chart } from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  public allData;
  public chartOptions;
  public chart;
  constructor() {
    this.allData = [];
  }
  @ViewChild('chartTarget') chartTarget: ElementRef;


  readfromcsv() {
    var csvPromise = d3.csv("/assets/AllData.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(() => {
      console.log(this.allData[0]);
      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'New York District Public Health Comparison'
        },
        xAxis: {
          categories: ['Smoking', 'Poverty', 'Obesity', 'Life_expectancy_rate'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Percentage',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: '%'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
        },
        credits: {
          enabled: false
        }
      };
      this.chart = chart(this.chartTarget.nativeElement, this.chartOptions);
    });

  }

  changedSelectedDistricts(district) {
    console.log("Changed");
    console.log(district.ID);
    console.log(district.checked);
    console.log(district);
    if(district.checked) {
      this.chart.addSeries({id: district.Name, name: district.Name, data:
          [parseInt(district.Smoking),
            parseInt(district.Poverty),
            parseInt(district.Obesity),
            parseInt(district.Life_expectancy_rate)
          ]
      });

    }
    else {
      this.chart.get(district.Name).remove();
    }
    var selectedDistricts = this.allData.filter(element => element.checked == true);
    console.log(selectedDistricts);
    // TODO: Fill charts with data of selected districts


  }
  ngOnInit() {
    this.readfromcsv();

  }


}

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
  public chartOptions1;
  public chart;
  public chart1;
  constructor() {
    this.allData = [];
  }
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @ViewChild('chartTarget1') chartTarget1: ElementRef;


  readfromcsv() {
    var csvPromise = d3.csv("/assets/AllData.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(() => {
      console.log(this.allData[0]);
      this.chartOptions = {
        chart: {
          type: 'bar',
          height: 800
        },
        title: {
          text: 'Risk factors'
        },
        xAxis: {
          categories: ['Smoking', 'Poverty', 'Obesity', 'Exercise', 'No Insurance', 'Unemployment', 'Excellent self reported Health'],
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
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          backgroundColor: '#FFFFFF'
        },
        credits: {
          enabled: false
        }
      };

      // !!!SECOND CHART!!!
      this.chartOptions1 = {
        chart: {
          type: 'bar',
          height: 800
        },
        title: {
          text: 'Diseases'
        },
        xAxis: {
          categories: ['Asthma (5-14)', 'Avoidable Asthma', 'Alcohol Hospitalization', 'Assault Hospitalization', 'Avoidable Diabetes', 'Drug Hospitalization', 'HIV Diagnosis', 'Premature Mortality', 'Psychological Hospitalization', 'Stroke Hospitalization'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'per 100,000 citizens',
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
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          backgroundColor: '#FFFFFF'
        },
        credits: {
          enabled: false
        }
      };
      this.chart = chart(this.chartTarget.nativeElement, this.chartOptions);
      this.chart1 = chart(this.chartTarget1.nativeElement, this.chartOptions1);
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
            parseInt(district.Exercise),
            parseInt(district.Insurance),
            parseInt(district.Unemployment),
            parseInt(district.Self_rep_health)
          ]
      });
      this.chart1.addSeries({id: district.Name, name: district.Name, data:
          [parseInt(district.Asthma_5to14),
            parseInt(district.Avoidable_Asthma),
            parseInt(district.Alc_Hosp),
            parseInt(district.Assault_Hosps),
            parseInt(district.Avoidable_Diabetes),
            parseInt(district.Drug_Hosp),
            parseInt(district.HIV_Diagnosis),
            parseInt(district.Premature_Mort),
            parseInt(district.Psych_Hosp),
            parseInt(district.Stroke_Hosp)
          ]
      });

    }
    else {
      this.chart.get(district.Name).remove();
      this.chart1.get(district.Name).remove();
    }
    var selectedDistricts = this.allData.filter(element => element.checked == true);
    console.log(selectedDistricts);


  }
  ngOnInit() {
    this.readfromcsv();

  }


}

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
  public chartOptions2;
  public chartOptions3;
  public chart;
  public chart1;
  public chart2;
  public chart3;
  constructor() {
    this.allData = [];
  }
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @ViewChild('chartTarget1') chartTarget1: ElementRef;
  @ViewChild('chartTarget2') chartTarget2: ElementRef;
  @ViewChild('chartTarget3') chartTarget3: ElementRef;



  readfromcsv() {
    var csvPromise = d3.csv("/assets/AllData.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(() => {
      console.log(this.allData[0]);
      this.allData.sort(function(a,b) {
        if ( a.Name < b.Name )
          return -1;
        if ( a.Name > b.Name )
          return 1;
        return 0;
      } );
      console.log(this.allData[0].Asthma_5to14);
      this.allData.map(element => {
        try {
          element.Asthma_5to14 = element.Asthma_5to14 * 10;
        }
        catch(err)
        {}
      });
      console.log(this.allData[0].Asthma_5to14);

      this.chartOptions = {
        chart: {
          type: 'bar',
          height: 800,
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
          valueSuffix: ' per 100,000'
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
      // !!!THIRD CHART!!!
      this.chartOptions2 = {
        chart: {
          type: 'bar',
          height: 500
        },
        title: {
          text: 'Life expectancy'
        },
        xAxis: {
          categories: ['Life expectancy'],
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Age',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' years'
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
      // !!!FOURTH CHART!!!
      this.chartOptions3 = {
        chart: {
          type: 'bar',
          height: 1000
        },
        title: {
          text: 'Demographics'
        },
        xAxis: {
          categories: ['Age0to17',
          'Age18to24',
          'Age25to44' ,
          'Age45to64' ,
          'Age65plus' ,
          'College Degree and Higher',
          'High School Diploma or Some College' ,
          'Did Not Complete High School' ,
          'School Absent' ,
          'Nonwhite' ,
          'Asian' ,
          'Black' ,
          'White' ,
          'Hispanic' ,
          'Other race'],
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
      this.chart = chart(this.chartTarget.nativeElement, this.chartOptions);
      this.chart1 = chart(this.chartTarget1.nativeElement, this.chartOptions1);
      this.chart2 = chart(this.chartTarget2.nativeElement, this.chartOptions2);
      this.chart3 = chart(this.chartTarget3.nativeElement, this.chartOptions3);
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
      this.chart2.addSeries({id: district.Name, name: district.Name, data:
          [parseInt(district.Life_expectancy_rate)
          ]
      });
      this.chart3.addSeries({id: district.Name, name: district.Name, data:
          [parseInt(district.Age0to17_rate),
            parseInt(district.Age18to24_rate),
            parseInt(district.Age25to44_rate),
            parseInt(district.Age45to64_rate),
            parseInt(district.Age65plus_rate),
            parseInt(district.Educollegedegreeandhigher_rate),
            parseInt(district.Eduhsdegreeorsomecollege_rate),
            parseInt(district.Edudidnotcompletehs_rate),
            parseInt(district.Schoolabsent_rate),
            parseInt(district.Nonwhite_rate),
            parseInt(district.Raceasian_rate),
            parseInt(district.Raceblack_rate),
            parseInt(district.Racewhite_Rate),
            parseInt(district.Racehispanic_rate),
            parseInt(district.Raceother_rate)

          ]
      });


    }
    else {
      this.chart.get(district.Name).remove();
      this.chart1.get(district.Name).remove();
      this.chart2.get(district.Name).remove();
      this.chart3.get(district.Name).remove();
    }


  }
  ngOnInit() {
    this.readfromcsv();

  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, 
         AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import Meteo from 'src/models/Meteo';
//import { ESP32_Data } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //now < 1673391600000
  //now < 1673391600000
  meteos: any;
  private dbPath = '/first-test-file';
  private historyRef: AngularFireList<Meteo>;
  public history?: any;
  constructor(db: AngularFireDatabase){
    this.historyRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Meteo> {
    return this.historyRef;
  }
  
  ngOnInit(): void{
    this.retrieveMeteo();
  }

  retrieveMeteo(): void {
    this.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.meteos = data;
      console.log(this.meteos);
    });
  }

  
}

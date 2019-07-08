import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private storage: LocalStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  prepareExercise1() {
    this.storage.clearAll();
    this.getFiles([
      '__recordType2IOnwveH2',
      '__taskGmX-eLtSJ'
    ]).subscribe(files => {
      for (const {fname, file} of files) {
        this.storage.set(fname, file);
      }

      window.location.reload();
    });
  }

  prepareExercise2() {
    this.storage.clearAll();
    this.getFiles([
      '__recordTypeTz2VoKMct',
      '__task8Z8ACbtg6',
      '__task9qcyLW1p9',
      '__taskLB1xN4Hu2'
    ]).subscribe(files => {
      for (const {fname, file} of files) {
        this.storage.set(fname, file);
      }

      window.location.reload();
    });
  }

  getFiles(files: string[]): Observable<{ fname: string, file: Object }[]> {
    return forkJoin(files.map(fname => {
      return this.http.get(`assets/demo/${fname}.json`)
        .pipe(map(file => ({ fname, file })));
    }));
  }

}

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';


export interface IProject {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  isPublic: boolean;
}

@Injectable()
export class ProjectsService {

  constructor(private _http: HttpInterceptorService) {}

  query(): any {
   return this._http.get('data/projects.json')
   .map((res: Response) => {
     return res.json();
   });
  }

  get(id: string): any {
   return this._http.get('data/projects.json')
   .map((res: Response) => {
     let item: any;
     res.json().forEach((s: any) => {
       if (s.id === id) {
         item = s;
       }
     });
     return item;
   });
  }
}

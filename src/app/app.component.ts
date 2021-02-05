import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';
import { Observable } from 'rxjs';
// import questionnaireJson from './assets/questionnaire.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  questionnaireData: any;
  fields = [
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: 'required',
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: '^[a-zA-Z]+$',
          message: 'Accept only text'
        }
      ]
    },
    {
      type: 'password',
      label: 'Password',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: 'required',
          message: 'Password Required'
        }
      ]
    }
  ];
  
  public dynamicForm: FormGroup;
  showQuestionnaire = false;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.getJson().subscribe(response => {
       this.questionnaireData = response;
    });
    // this.questionnaireData = this.http.get('./assets/questionnaire.json'); // questionnaireJson;
   
    const controls:any = {};
    this.fields.forEach(res => {
      const validationsArray:any = [];
      res.validations.forEach(val => {
        if (val.name === 'required') {
          validationsArray.push(Validators.required);
        }
        if (val.name === 'pattern') {
          validationsArray.push(Validators.pattern(val.validator));
        }
      });
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(controls);
  }

  getJson(): Observable<any> {
    return this.http.get('./assets/questionnaire.json');
  }

  onSubmit(): void {
    console.log(this.dynamicForm.value);
    this.showQuestionnaire = true;
  }
}

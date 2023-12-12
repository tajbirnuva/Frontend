import { Component, OnInit, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { PersonService } from '../../services/person.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class PersonCreateComponent implements OnInit{
  private fb = inject(FormBuilder);
  personForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    age: [null, Validators.required],
    address: [null, Validators.required],
    gender: ['Male', Validators.required],
  });

  constructor(private personService: PersonService, private router: Router,private activeRoute: ActivatedRoute) {}

  hasUnitNumber = false;

  ngOnInit(){
    let id = this.activeRoute.snapshot.params['id'];
    this.personService.getPerson(id).subscribe(
      (value:any)=>{
        this.personForm.patchValue(value);
      },
    )
  }


  onSubmit(): void {
    this.personService.save(this.personForm.value).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          Swal.fire(
            'Data Save Successfully',
            'You submitted succesfully!',
            'success'
          );
          this.router.navigate(['/']);
        }
      },
      error: (error) => {},
    });
  }
}

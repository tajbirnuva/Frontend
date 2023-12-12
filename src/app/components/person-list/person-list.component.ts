import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { PersonService } from '../../services/person.service';
import { DataSource } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IfStmt } from '@angular/compiler';
import Swal from 'sweetalert2';
import { Person } from '../../models/Person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PersonListComponent implements AfterViewInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'name', 'age', 'action'];
  dataSource: Person[]=[];

  constructor(private personService: PersonService, private router: Router) {}

  ngAfterViewInit(): void {
    this.getAllPerson();
  }

   getAllPerson() {
    this.personService.getPersonList().subscribe({
      next: (value:any) => {
        this.dataSource = value;
      },
    });
  }

  deletePerson(id: any) {
    this.personService.delete(id).subscribe((response)=>{
      if(response.status===204){
        Swal.fire('Delete Person','Successfully','success');
        this.getAllPerson();
      }
    });
  }

  editPerson(id:any){
    this.router.navigate(['/update/'+id]);
  }
}

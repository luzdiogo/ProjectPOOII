import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  aluno: Aluno = new Aluno();

  alunoDataSource: MatTableDataSource<Aluno>;
  displayedAlunos: String[] = ['idaluno', 'nome', 'sexo', 'dt_nasc', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private alunoService: AlunoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAlunoList();
  }

  getAlunoList() {
    this.alunoService.getAlunoList()
      .subscribe(
        dados => {
          this.alunoDataSource = new MatTableDataSource<Aluno>(dados);
          this.alunoDataSource.paginator = this.paginator;
          this.alunoDataSource.sort = this.sort;
        },
        error => console.log(error)
      );
  }

  filtrarAlunos(event: Event) {
    let valor = (event.target as HTMLInputElement).value;
    this.alunoDataSource.filter = valor;
  }

  deletarAluno(delaluno : Aluno){
    this.alunoService.deleteAluno(delaluno.idaluno)
    .subscribe(
      dados => {
        this.alunoService.openSnackBar('Cadastro do Aluno excluído com sucesso!');
        this.getAlunoList();
      }
    )
  }
  
  navigateToAlunoNovo() {
    this.router.navigate(['/aluno-novo']);
  }

  navigateToAlunoEditar(aluno: Aluno) {
    this.router.navigate([`/aluno-editar/${aluno.idaluno}`]);
  }
}

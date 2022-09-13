import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';

@Component({
  selector: 'app-telefone-list',
  templateUrl: './telefone-list.component.html',
  styleUrls: ['./telefone-list.component.css']
})
export class TelefoneListComponent implements OnInit {

  constructor(){}
  ELEMENT_DATA: Inquilino[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Inquilino>(this.ELEMENT_DATA);

  ngOnInit(): void {}
}


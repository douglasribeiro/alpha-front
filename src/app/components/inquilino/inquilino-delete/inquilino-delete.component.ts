import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inquilino-delete',
  templateUrl: './inquilino-delete.component.html',
  styleUrls: ['./inquilino-delete.component.css']
})
export class InquilinoDeleteComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<InquilinoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    abort(): void {
      this.dialogo.close(false);
    }
    salvar(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}
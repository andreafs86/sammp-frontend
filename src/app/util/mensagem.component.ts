import { Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
    mensagem: string;
}

@Component({
    selector: 'dialog-mensagem',
    templateUrl: 'dialog-mensagem.html',
  })
  export class DialogMensagem {
    constructor(
      public dialogRef: MatDialogRef<DialogMensagem>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    close(){
      this.dialogRef.close();
    }
    
  }
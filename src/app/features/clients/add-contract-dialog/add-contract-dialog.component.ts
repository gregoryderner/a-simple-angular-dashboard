import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contract-dialog',
  templateUrl: './add-contract-dialog.component.html',
})
export class AddContractDialogComponent implements OnInit {
  contractForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientId: number }
  ) {
    this.contractForm = this.fb.group({
      contractNumber: ['', Validators.required],
      contractDate: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      clientId: [data.clientId, Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.contractForm.valid) {
      this.dialogRef.close(this.contractForm.value);
    }
  }
}

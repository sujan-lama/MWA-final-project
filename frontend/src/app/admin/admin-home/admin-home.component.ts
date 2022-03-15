import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

import {ColDef, GridReadyEvent, Module, RowClickedEvent,} from '@ag-grid-community/core';
import Response from "../../models/response";
import {map, mergeMap, Observable, of, Subscription} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from "../../modules/add-user/add-user.component";
import User from "../../models/users";
import {UserdialogComponent} from "../../custom-dialog/userdialog/userdialog.component";

@Component({
  selector: 'app-admin-home',
  templateUrl: 'admin-home.component.html',
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  modules: Module[] = [
    ClientSideRowModelModule,
  ]
  columnDefs: ColDef[] = [
    {
      headerName: "S.N",
      valueGetter: "node.rowIndex + 1",
      flex: 0.2
    },
    {field: 'name'},
    {field: 'email'},
    {field: 'role'}
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  rowData!: Observable<any[]>;

  dialogSubscription !: Subscription;
  dialogSubscription2 !: Subscription;

  constructor(
    private service: AdminService,
    public dialog: MatDialog
  ) {
  }

  fetchData() {
    this.rowData = this.service.getUsers().pipe(
      map(v => v as Response),
      mergeMap((v) => of(v.data))
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.fetchData();
  }


  ngOnInit(): void {
    console.log('admin home component')
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent);
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchData();
      }
    });
  }

  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
    this.dialogSubscription2.unsubscribe();
  }

  onRowClicked(event: RowClickedEvent) {
    const dialogRef = this.dialog.open(UserdialogComponent, {
      data: event.data as User
    });

    this.dialogSubscription2 = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(result).subscribe(v => this.fetchData())
      }
    });
  }
}

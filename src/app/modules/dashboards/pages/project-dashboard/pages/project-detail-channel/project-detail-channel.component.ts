import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
// import { dataDummyChannel, IChannel } from './dummyChannel';
import { ProjectDetailChannelDialogComponent } from './project-detail-channel-dialog/project-detail-channel-dialog.component';
import { Project } from '../../../../../../shared/models/project.model';
import { ProjectDetailAddChannelDialogComponent } from './project-detail-add-channel-dialog/project-detail-add-channel-dialog.component';
import { Channel, IChannel } from '../../../../../../shared/models/channel.model';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';

@Component( {
    selector: 'app-project-detail-channel',
    templateUrl: './project-detail-channel.component.html',
    styleUrls: [ './project-detail-channel.component.scss' ]
} )
export class ProjectDetailChannelComponent implements OnInit {
    // Nanti ini dipakai bersama OnChanges
    // @Input() dataFromParent: ICampaign[];

    @Input() dataProject: Project;

    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Channel>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'image', 'name', 'teams', 'leads', 'status', 'action' ];
    dataSource = new MatTableDataSource<Channel>();

    constructor(
        private dialog: MatDialog,
        private http: DashboardProjectService
    ) {
    }

    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( ProjectDetailChannelDialogComponent, {
            panelClass: 'project_channel_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: Channel ) => {
            if ( result ) {
                this.dataSource.data.forEach( arr => {
                    if ( arr.id === result.id ) {
                        Object.assign( arr, result );
                    }
                } );
                this.table.renderRows();
            }
        } );
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    addChannel() {
        const dialogRef = this.dialog.open( ProjectDetailAddChannelDialogComponent, {
            panelClass: 'project_channel_dialog',
            data: this.dataProject
        } );
        dialogRef.afterClosed()
            .subscribe( ( result ) => {
                console.log( result );
            } );
    }

    ngOnInit() {
        this.http.getAllChannel( this.dataProject.id )
            .subscribe( value => {
                this.dataSource.data = value;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } );
    }

    // Engkok nggawe iki harus'e implements OnChanges
    /*ngOnChanges( data: SimpleChanges ) {
        if ( data[ 'dataFromParent' ] ) {
            this.dataSource.data = dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }*/
}

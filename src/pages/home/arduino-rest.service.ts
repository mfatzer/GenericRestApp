import {Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';


@Injectable()
export class ArduinoRestService {
    private static readonly IP_ADDRESS: string = "/arduino";

    private _restResources: any = [];

    public constructor(private http: Http) {
        this.fetchResources();
    }

    public get restResources(): any {
        return this._restResources;
    }

    private fetchResources(): void {
        this.http
                .get(ArduinoRestService.IP_ADDRESS)
                .subscribe((response: Response) => this.parseResponse(response));
    }

    private parseResponse(response: Response): void {
        if (! response.ok) {
            return;
        }
        this._restResources = response.json().configuration;
    }
}

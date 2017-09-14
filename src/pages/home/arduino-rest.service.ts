import { ArduinoResourceFactory } from './arduino-resource.factory';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AbstractArduinoResource } from './arduino-resources';


export type GetCallback = (value: string) => void;

@Injectable()
export class ArduinoRestService {
    private static readonly IP_ADDRESS: string = "/arduino";
    private static readonly VALUE_HEADER: string = "value";
    private static readonly RETURN_VALUE_HEADER: string = "returnvalue";
    private static readonly REFRESH_TIMEOUT_IN_MILLIES: number = 5000;

    private _restResources: Array<AbstractArduinoResource> = [];
    private _timer;

    public constructor(private http: Http) {
        this.fetchResources();
    }

    public get restResources(): Array<AbstractArduinoResource> {
        return this._restResources;
    }

    public sendGetRequest(resourceLabel: string, callBack: GetCallback): void {
        this.http
                .get(this.createResourceURI(resourceLabel))
                .subscribe((response: Response) => {
                    if (response.ok) {
                        let returnValue = response.headers.get(ArduinoRestService.RETURN_VALUE_HEADER);
                        if (returnValue) {
                            callBack(returnValue);
                        }
                    }
                });
    }

    public sendPutRequest(resourceLabel: string, value: string): void {
        let headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set(ArduinoRestService.VALUE_HEADER, value);
        let options = new RequestOptions({headers: headers});
        this.http
                .put(this.createResourceURI(resourceLabel), "", options)
                .subscribe((response: Response) => {
                    ;
                });
    }

    private createResourceURI(resourceLabel: String) {
        return ArduinoRestService.IP_ADDRESS + "/" + resourceLabel;
    }

    private fetchResources(): void {
        this.http
                .get(ArduinoRestService.IP_ADDRESS)
                .subscribe((response: Response) => { 
                    this.parseResourceResponse(response)
                    this.startRefresh();
                });
    }

    private parseResourceResponse(response: Response): void {
        let responseObj = this.parseResponse(response);
        this._restResources = ArduinoResourceFactory.create(responseObj.configuration, this);
    }

    private parseResponse(response: Response): any {
        if (! response.ok) {
            return null;
        }
        return response.json();
    }

    private startRefresh(): void {
        this._timer = setInterval(() => this.updateAllResources() , ArduinoRestService.REFRESH_TIMEOUT_IN_MILLIES);
    }

    private updateAllResources(): void {
        this._restResources.forEach((resource) => {
            resource.updateValueFromServer();
        });
    }
}

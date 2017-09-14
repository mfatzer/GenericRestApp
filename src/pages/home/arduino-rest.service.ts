import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';


export type GetCallback = (value: string) => void;

@Injectable()
export class ArduinoRestService {
    private static readonly IP_ADDRESS: string = "/arduino";
    private static readonly VALUE_HEADER = "Value";
    private static readonly RETURN_VALUE_HEADER = "ReturnValue";

    private _restResources: any = [];

    public constructor(private http: Http) {
        this.fetchResources();
    }

    public get restResources(): any {
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
        headers.set(ArduinoRestService.VALUE_HEADER, value);
        this.http
                .put(this.createResourceURI(resourceLabel), "", { headers: headers })
    }

    private createResourceURI(resourceLabel: String) {
        return ArduinoRestService.IP_ADDRESS + "/" + resourceLabel;
    }

    private fetchResources(): void {
        this.http
                .get(ArduinoRestService.IP_ADDRESS)
                .subscribe((response: Response) => this.parseResourceResponse(response));
    }

    private parseResourceResponse(response: Response): void {
        let responseObj = this.parseResponse(response);
        this._restResources = responseObj ? responseObj.configuration : [];
    }

    private parseResponse(response: Response): any {
        if (! response.ok) {
            return null;
        }
        return response.json();
    }
}

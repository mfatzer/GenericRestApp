import { ArduinoRestService } from './arduino-rest.service';


export abstract class AbstractArduinoResource {
    private static readonly DIGITAL_OUTPUT: string = "DIGITAL_OUTPUT";
    private static readonly DIGITAL_INPUT: string = "DIGITAL_INPUT";
    private static readonly ANALOG_OUTPUT: string = "ANALOG_OUTPUT";
    private static readonly ANALOG_INPUT: string = "ANALOG_INPUT";
    
    public constructor(
        private _label: string, 
        private _type: string,
        private _pin: number,
        private _arduinoRestService: ArduinoRestService) {
            this._label = (this._label) ? this._label : "";
            this._type = (this._type) ? this._type : "";
    }

    public get label(): string {
        return this._label;
    }

    public get type(): string {
        return this._type;
    }

    public isDigitalOutput(): boolean {
        return this.type === AbstractArduinoResource.DIGITAL_OUTPUT;
    }

    public isDigitalInput(): boolean {
        return this.type === AbstractArduinoResource.DIGITAL_INPUT;
    }

    public isAnalogOutput(): boolean {
        return this.type === AbstractArduinoResource.ANALOG_OUTPUT;
    }

    public isAnalogInput(): boolean {
        return this.type === AbstractArduinoResource.ANALOG_INPUT;
    }

    public get pin(): number {
        return this._pin;
    }

    public get arduinoRestService(): ArduinoRestService {
        return this._arduinoRestService;
    }

    protected setServerValue(value: string): void {
        this._arduinoRestService.sendPutRequest(this.label, value);
    }

    public abstract updateValueFromServer(): void;
}

export abstract class DigitalResource extends AbstractArduinoResource {
    public static readonly HIGH: string = "HIGH";
    public static readonly LOW: string = "LOW";


    public static stateStringToBool(state: string): boolean {
        return (state === DigitalResource.HIGH);
    } 

    public static boolToStateString(value: boolean): string {
        return value ? DigitalResource.HIGH : DigitalResource.LOW;
    }

    public constructor(
                label: string,
                type: string,
                pin: number,
                private _on: boolean,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, arduinoRestService);
    }
    
    public get on(): boolean {
        return this._on;
    }

    protected setOnValueAsString(value: string): void {
        this._on = DigitalResource.stateStringToBool(value);
    }

    public updateValueFromServer(): void {
        this.arduinoRestService.sendGetRequest(this.label, (value) => this.setOnValueAsString(value));
    }
}

export class DigitalInput extends DigitalResource {
    public constructor(
                label: string,
                type: string,
                pin: number,
                on: boolean,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, on, arduinoRestService);
    }


}

export class DigitalOutput extends DigitalResource {
    public constructor(
                label: string,
                type: string,
                pin: number,
                on: boolean,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, on, arduinoRestService);
    }

    public set on(value: boolean) {
        this.setServerValue(DigitalResource.boolToStateString(value));
    }
}

export abstract class AnalogResource extends AbstractArduinoResource {

    public static valueStringToNumber(value: string): number {
        return Number(value);
    } 

    public static numberToValueString(value: number): string {
        return Number(value).toString();
    }

    public constructor(
                label: string,
                type: string,
                pin: number,
                private _value: number,
                private _min: number,
                private _max: number,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, arduinoRestService);
    }
    
    public get value(): number {
        return this._value;
    }

    public get min(): number {
        return this._min;
    }

    public get max(): number {
        return this._max;
    }

    protected setValueAsString(value: string): void {
        this._value = AnalogResource.valueStringToNumber(value);
    }

    public updateValueFromServer(): void {
        this.arduinoRestService.sendGetRequest(this.label, (value) => this.setValueAsString(value));
    }
}

export class AnalogInput extends AnalogResource {
    public constructor(
                label: string,
                type: string,
                pin: number,
                value: number,
                min: number,
                max: number,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, value, min, max, arduinoRestService);
    }


}

export class AnalogOutput extends AnalogResource {
    public constructor(
                label: string,
                type: string,
                pin: number,
                value: number,
                min: number,
                max: number,
                arduinoRestService: ArduinoRestService)  {
        super(label, type, pin, value, min, max, arduinoRestService);
    }

    public set value(value: number) {
        this.setServerValue(AnalogResource.numberToValueString(value));
    }
}

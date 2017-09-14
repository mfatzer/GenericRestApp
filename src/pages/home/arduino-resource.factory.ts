import { AbstractArduinoResource, DigitalOutput, DigitalInput, AnalogOutput, AnalogInput } from './arduino-resources';
import { ArduinoRestService } from './arduino-rest.service';


export class ArduinoResourceFactory {
    public static readonly DIGITAL_OUTPUT_TYPE = "DIGITAL_OUTPUT";
    public static readonly DIGITAL_INPUT_TYPE = "DIGITAL_INPUT";
    public static readonly ANALOG_OUTPUT_TYPE = "ANALOG_OUTPUT";
    public static readonly ANALOG_INPUT_TYPE = "ANALOG_INPUT";
    
    public static create(jsonResources: Array<any>, arduinoRestService: ArduinoRestService): Array<AbstractArduinoResource> {
        let result = [];
        jsonResources.forEach((jsonResource) => {
            if (jsonResource.type === ArduinoResourceFactory.DIGITAL_OUTPUT_TYPE) {
                result.push(
                    new DigitalOutput(
                        jsonResource.label,
                        jsonResource.type,
                        jsonResource.pin,
                        jsonResource.on,
                        arduinoRestService));
            } else if (jsonResource.type === ArduinoResourceFactory.DIGITAL_INPUT_TYPE) {

            } else if (jsonResource.type === ArduinoResourceFactory.ANALOG_OUTPUT_TYPE) {

            } else if (jsonResource.type === ArduinoResourceFactory.ANALOG_INPUT_TYPE) {

            }
        });
        return result;
    }
}

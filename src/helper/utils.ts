export class Utils {
    
    public static createRequestFromObject = (keyValue: any) => {
        const keys         = Object.keys(keyValue);
        const request: any = {};
        keys.filter(key => keyValue[key]).forEach(key => {
            if ( keyValue[key] instanceof Array ) {
                request[key] = keyValue[key].map((valLabel: any) => valLabel.value);
            } else if ( keyValue[key] instanceof Object ) {
                request[key] = keyValue[key].value;
            } else {
                request[key] = keyValue[key];
            }
        });
        return request;
    };
    
    public static onError = ( response : any, alert: any) => {
        if ( response.data && response.data.message ) {
            alert.error(response.data.message);
        } else {
            alert.error('Try again later.');
        }
    };
}
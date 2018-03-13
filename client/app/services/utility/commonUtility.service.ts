
declare var moment: any;

export class CommonUtilityService {

    public formatDate(date: Date, format: string) {
        return moment(date).format(format);
    }

    public vehiclePlatePattern: RegExp = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;


}
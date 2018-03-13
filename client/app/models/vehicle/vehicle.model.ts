import ColorModel from "./color.model";
import BrandModelModel from "./brandModel.model";
import BrandModel from "./brand.model";
import BaseModel from "../_base.model";
import PlateModel from "./plate.model";
import SaleInfoModel from "./saleinfo.model";
import VehicleFeatureModel from "./vehicleFeature.model";

export default interface VehicleModel extends BaseModel {
    plateHistory?: PlateModel[]
    modelYear?: number;
    registrationDocumentNumber?: string;
    registrationDate?: Date,
    kmStatus?: number,
    nextExaminationDate?: Date,
    trafficInsurenceEndDate?: Date,
    vehicleInsurenceEndDate?: Date,
    ogsLabelNumber?: string,
    warning?: boolean,
    description?: string,
    saleInfo?: SaleInfoModel,
    engineNumber?: string,
    chassisNumber?: string,
    tapeCode?: string,
    brand?: BrandModel,
    brandModel?: BrandModelModel,
    color?: ColorModel,
    gearType?: string,
    seatCount?: string,
    enginePower?: string,
    horsePower?: string,
    features?: VehicleFeatureModel[];


    plate?: string;
    colorName?: string;
}

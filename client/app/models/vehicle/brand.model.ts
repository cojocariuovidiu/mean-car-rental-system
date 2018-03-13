import BaseModel from "../_base.model";
import BrandModelModel from "./brandModel.model";


export default interface BrandModel extends BaseModel {
    modelName: string;
    brandModels?: Array<BrandModelModel>;

}
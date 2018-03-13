export default interface BaseModel {
    _id?: string;
    active?: boolean;
    addedBy?: string;
    addedAt?: Date,
    updatedBy?: string,
    updatedAt?: Date
}
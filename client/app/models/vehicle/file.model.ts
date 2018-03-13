export default interface FileModel {
    _id: string;
    filename: string;
    contentType: string;
    length: number;
    md5: string;
    uploadDate: Date;
    chunkSize: number;
}
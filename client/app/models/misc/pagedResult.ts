
export default interface PagedResult<TModel> {

    data: Array<TModel>,
    total: number,
}
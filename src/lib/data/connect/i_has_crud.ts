export default interface IHasCrud<T> {
    create(data: T): Promise<boolean>;
    read(id: number): Promise<T>;
    update(id: number, data: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}

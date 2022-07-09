export const createItem = async (model, args) => {
    try {
        return model.create(args);
    } catch (err) {
        log.info({err});
        throw err;
    }
}
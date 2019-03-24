class DatabaseApi {
    constructor(model) {
        if(model === undefined){
            throw new Error('No model provided');
        }
        this.model = model;
    }

    getAllData(opts = {}) {
        if(typeof opts!='object'){
            throw new Error('Options needed to be a object');
        }
        return this.getMultipleData({},opts);
    }

    getSpecificData(searchParameter) {
        if(typeof searchParameter != 'object') throw new Error('searchParameter should be a object')
        return this.model.find(searchParameter);
    }

    getMultipleData(searchParameter, opts = {}){
        if(typeof opts!='object'){
            throw new Error('Options needed to be a object');
        }
        const demands = opts.demands || '';
        const skip = opts.skip || 0;
        const limit = opts.limit || 0;

        return this.model.find(searchParameter, demands).skip(skip).limit(limit);
    }

    updateOneRow(searchParameter, updatedData) {
        return this.model.findOneAndUpdate(searchParameter, updatedData, {new: true})        
    }

    addCollections(newRowInfo) {
        const newInstance = new this.model(newRowInfo);
        return newInstance.save();
    }

    getOneLevelRelationalData(searchParameter, populateParameter){
        if(typeof searchParameter != 'object') throw new Error('Search parameter must be an object')
        return this.model.find(searchParameter).populate(populateParameter);
    }
}

module.exports = DatabaseApi;
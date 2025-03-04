class ApiFeatures {
    constructor(mongooseQuery, query) {
        this.mongooseQuery = mongooseQuery;
        this.query = query;
    }

    sort() {
        if (this.query.sort) {
            const sortBy = this.query.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }

    search() {
        if (this.query.keyword) {
            const searchQuery = {
                $or: [
                    { title: { $regex: this.query.keyword, $options: 'i' } },
                    { description: { $regex: this.query.keyword, $options: 'i' } },
                ]
            };
            this.mongooseQuery = this.mongooseQuery.find(searchQuery);
        }
        return this;
    }

    filter() {
        const queryCopy = { ...this.query };

        // Removing special fields that are not needed for filtering
        const removeFields = ['page', 'sort', 'limit', 'fields'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Convert operators (gt, gte, lt, lte) to MongoDB format
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }

    pagination() {
        const page = this.query.page * 1 || 1;
        const limit = this.query.limit * 1 || 50;
        const skip = (page - 1) * limit;

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }

    limitFields() {
        if (this.query.fields) {
            const fields = this.query.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }
}

module.exports = ApiFeatures;

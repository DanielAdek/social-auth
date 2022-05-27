/**
 * @class Paginator
 * @desc Paginates result
 */
export class Paginator {
  /**
   * @constructor Paginator
   * @param {*} _page the page size number
   * @param {*} _limit the page limit number
   * @param {*} _req the request object
   */
  constructor(_page, _limit, _req) {
    this.page = parseInt(_page, 10) || 1;
    this.limit = parseInt(_limit, 10) || 10;
    this.req = _req;
  }

  /**
   * @method Asyc
   * @param {*} model Database model
   * @param {*} data data to query with
   * @param {*} joinQueries join query object
   * @param {*} search search query
   * @param {*} order order by query
   * @param {*} transform transformation function
   * @returns {object} json
   */
  async queryAndGetPaginationResultAsync(model, data, joinQueries, search = {}, order = [], transform) {
    try {
      // Get offset value
      const offset = (this.page * this.limit) - this.limit;

      // create an options object
      let options = {
        offset,
        limit: this.limit,
      };

      if (data) options.where = data;

      if (joinQueries) options.include = joinQueries;

      // Get previous page
      const prevPage = this.page <= 1 ? null : this.page - 1;

      // check if the search object is empty
      search = {};
      if (Object.keys(search).length) {
        options = Object.assign({ options }, search);
      }

      // check if the order array is empty
      if (order && order.length) {
        options.order = order;
      } else order = [['createdAt', 'DESC']];

      // take in the model, take in the options
      const result = await model.findAndCountAll(options);

      // Get next page
      const nextPage = (result.count / this.limit) > this.page ? this.page + 1 : null;

      // check if the transform is a function and is not null
      if (transform && typeof transform === 'function') {
        result.rows = transform(result.rows);
      }

      const endpoint = `${this.req.protocol}://${this.req.headers.host}${this.req.originalUrl}`;

      return {
        data: result.rows,
        metadata: {
          previousPage: prevPage,
          currentPage: this.page,
          nextPage,
          total: result.count,
          limit: this.limit,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

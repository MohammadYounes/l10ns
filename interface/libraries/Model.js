
if(typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var Backbone;

  if(inClient) {
    Backbone = require('backbone');
  }
  else if(inServer) {
    Backbone = require('backbone');
    require('backbone-relational');
  }

  /**
   * We alias the `Backbone.Model` to just `Model`. Because
   * we wan't to generalize the constructor name.
   *
   * @constructor Model
   */

  var Constructor = Backbone.RelationalModel.extend({

    /**
     * Set page title
     *
     * @param {String} title
     * @return {void}
     * @api public
     */

    setPageTitle : function(title) {
      if(inServer) {
        this.page.title = title;
      }
      else {
        app.document.set('title', title);
      }
    },

    /**
     * Set page description
     *
     * @param {String} description
     * @return {void}
     * @api public
     */

    setPageDescription : function(description) {
      if(inServer) {
        this.page.description = description;
      }
      else {
        app.document.set('description', description);
      }
    },

    /**
     * Set keywords
     *
     * @param {String} keywords
     * @return {void}
     * @api public
     */

    setKeywords : function(keywords) {
      if(inServer) {
        this.page.keywords = keywords;
      }
      else {
        app.document.set('keywords', keywords);
      }
    },

    /**
     * CompositeRouter is always executing this callback if it doesn't
     * render the view for this model.
     *
     * @param {String} path
     * @return {void}
     * @api public
     */

    onHistoryChange : function(path) {}
  });

  /**
   * Page properties
   *
   * @type {Object}
   */

  Constructor.prototype.page = {};

  /**
   * Check if model have bootstrapped data from the document
   *
   * @type {Boolean}
   */

  Constructor.prototype.bootstrapped = false;

  /**
   * Export constructor
   */

  return Constructor;
});

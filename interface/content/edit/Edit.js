
if(typeof define !== 'function') {
  var define = require('amdefine')(module);
}
if(inServer) {
  var file = require('../../../lib/file');
}

define(function(require) {
  var Backbone
    , Model = inServer ? require('../../lib/Model') : require('Model')
    , Collection = inServer ? require('../../lib/Collection') : require('Collection')
    , template = inServer ? content_appTmpls : require('contentTmpls')
    , _ = require('underscore')
    , Condition = require('./Condition')
    , ConditionView = require('./ConditionView')
    , Input = require('./Input')
    , InputView = require('./InputView');

  if(inClient) {
    Backbone = require('backbone');
    var request = require('request')
  }
  else {
    Backbone = require('backbone-relational');
  }

  var Conditions = Collection.extend({
    model : Condition
  });

  var Inputs = Collection.extend({
    model : Input
  });

  return Model.extend({

    /**
     * Initializer
     *
     * @return {void}
     * @api public
     */

    initialize : function() {
      if(inClient) {
        // Parse bootstrapped data
        var $json = $('.js-json-edit');
        if($json.length) {
          this._parse(JSON.parse($json.html()));
          $json.remove();
        }
      }
    },

    /**
     * Relations
     *
     * @type {Object}
     */

    relations : [{
      type: 'HasMany',
      key: 'conditions',
      relatedModel: Condition,
      collectionType: Conditions,
      reverseRelation: {
        key: 'translation',
        includeInJSON: 'id'
      }
    },
    {
      type: 'HasMany',
      key: 'inputs',
      relatedModel: Input,
      collectionType: Inputs,
      reverseRelation: {
        key: 'translation',
        includeInJSON: 'id'
      }
    }],

    /**
     * Parse values(conditions and inputs)
     *
     * @param {Array.<value>} values
     * @return {void}
     * @api private
     */

    _parseValues : function(values, vars) {
      for(var i = 0; i<values.length; i++) {
        if(values[i].length > 2) {
          var y = 0, row = 0;
          while(typeof values[i][y] !== 'undefined') {
            var condition = new Condition({
              statement : values[i][y],
              firstOperand : values[i][y + 1],
              operator : values[i][y + 2],
              operators : cf.OPERATORS,
              lastOperand : values[i][y + 3],
              additionalCompairOperators : cf.ADDITIONAL_COMPAIR_OPERATORS,
              vars : vars,
              row : row,
              translation : this
            });

            row++;

            // Continue condition statement
            if(values[i][y + 4] === '&&'
            || values[i][y + 4] === '||') {
              y += 4;
              continue;
            }

            // Initialize input
            var input = new Input({
              value : values[i][y + 4],
              row : row,
              translation : this
            });

            y += 5;

            row++;
          }
        }
        else {
          // Initialize input
          var input = new Input({
            value : values[i][1],
            row : row,
            translation : this
          });
        }
      }
    },

    /**
     * Parse raw data
     *
     * @param {JSON} json
     * @return {void}
     * @api private
     */

    _parse : function(json) {
      this._parseValues(json.values, json.vars);
      this.set('key', json.key);
      this.set('variables', json.variables);
      this.set('text', json.text);

      return this;
    },

    /**
     * Default values
     *
     * @type {Object}
     */

    defaults : {
      key : null,
      values : [],
      vars : [],
      text : '',
      timestamp : null,
      _new : false,

      i18n_variables : 'VARIABLES',
      i18n_translation : 'TRANSLATION',
      i18n_none : 'None',
      i18n_save : 'SAVE',
      i18n_addCondition : 'ADD CONDITION',
      variables : null
    },

    /**
     * Sync
     *
     * @delegate
     */

    sync : function(method, collection, opts, req) {
      var _this = this;

      if(method === 'read') {
        if(inServer) {
          var translations = file.readTranslations(cf.DEFAULT_LOCALE, { returnType : 'array' }).slice(0, cf.TRANSLATION_ITEMS_PER_PAGE);
          var translation = _.findWhere(translations, { id : req.param('id') });
          this._parse(translation);
          this.setPageTitle(translation.key);
          this.setPageDescription('Edit: ' + translation.key);
          return opts.success();
        }
        else {
          var id = window.location.pathname.split('/')[2];
          var translation = app.models.translations.get(id);
          if(translation) {
            translation = translation.toJSON();
            this._parse(translation);
            app.document.set('title', translation.key);
            app.document.set('description', 'Edit: ' + translation.key);
            opts.success();
            return;
          }
          request
            .get('/translations/' + id)
            .end(function(err, res) {
              var translation = res.body;
              _this._parse(translation);
              app.document.set('title', translation.key);
              app.document.set('description', 'Edit: ' + translation.key);
              opts.success();
            });
        }
      }
    },

    /**
     * Get JSON represenation of object
     *
     * @override toJSON
     */

    toJSON : function() {
      var json = Model.prototype.toJSON.call(this);
      return json;
    },

    /**
     * Add value object
     *
     * @return {void}
     * @api public
     */

    addValueObject : function(row, object) {
    },

    /**
     * Remove value object
     *
     * @return {void}
     * @api public
     */

    removeValueObject : function(row) {
    }
  });
});
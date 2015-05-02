var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

var CtoolsContentTypeGenerator = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    prompts = [
      {
        type : 'input',
        name : 'contentTypeTitle',
        message : 'Content Type Title?',
      },
      {
        type : 'input',
        name : 'contentTypeDescription',
        message : 'Content Type Description?',
      },
      {
        type : 'input',
        name : 'contentTypeMachineName',
        message : 'Machine name?',
      },
      {
        type : 'input',
        name : 'contentTypeCategory',
        message : 'Category for Panels UI?',
      },
      {
        type : 'input',
        name : 'contentTypeContext',
        message : 'Enter label for a required context?',
        default: false
      },
      {
        type : 'input',
        name : 'contentTypeEditForm',
        message : 'Provide a Settings Form?',
        default: false
      },
      {
        type : 'checkbox',
        name : 'contentTypeOptions',
        message : 'Other options:',
        choices : [
          {
            name : 'Custom Admin Title callback',
            value : 'adminTitleCallback'
          },
          {
            name : 'Custom Admin Info callback',
            value : 'adminInfoCallback'
          },
        ]
      }
    ]

    this.prompt(prompts, function (answers) {
      this.contentTypeTitle       = answers.contentTypeTitle;
      this.contentTypeDescription = answers.contentTypeDescription;
      this.contentTypeMachineName = answers.contentTypeMachineName;
      this.contentTypeCategory    = answers.contentTypeCategory;
      this.contentTypeContext     = answers.contentTypeContext;
      this.contentTypeEditForm    = answers.contentTypeEditForm;
      this.adminTitleCallback     = (answers.contentTypeOptions.indexOf('adminTitleCallback') != -1);
      this.adminInfoCallback      = (answers.contentTypeOptions.indexOf('adminInfoCallback') != -1);
      done();
    }.bind(this));

  },

  writing: function () {
    var template_params = {
      ct_title:        this.contentTypeTitle,
      ct_description:  this.contentTypeDescription,
      ct_machine_name: this.contentTypeMachineName,
      ct_category:     this.contentTypeCategory,
      ct_context:      this.contentTypeContext,
      ct_edit_form:    this.contentTypeEditForm,
      ct_admin_title:  this.adminTitleCallback,
      ct_admin_info:   this.adminInfoCallback
    };

    mkdirp(this.contentTypeMachineName, function (err) {
      if (err) {
        this.env.error("Can't create the content type directory. Aborting.");
      }
    });
    this.template('ctools_content_type.inc', this.contentTypeMachineName + '/' + this.contentTypeMachineName + '.inc', template_params);
  },

});

module.exports = CtoolsContentTypeGenerator;

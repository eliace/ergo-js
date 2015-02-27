
var path = require('path');

//var ERGO_VERSION = '0.11.3';





var bootstrap_extractor = function(filepath, filecontent) {
	return extractor.call(this, filepath, filecontent, 'bootstrap');
};



var extractor = function(filepath, filecontent, d) {
			    	
    var workingdir = path.normalize(filepath).split(path.sep);
    workingdir.pop();
    
    var cwd = path.normalize(process.cwd()).split(path.sep);
    cwd.push(d || 'js');//'js');
		
    var deps = this.getMatches(/\/\/= require "(.*)"/g, filecontent);
    
    deps.forEach(function(dep, i) {
        var dependency = workingdir.concat([dep+'.js']);
        deps[i] = dependency.join('/');// path.join.apply(null, dependency);
    });
    
    var deps2 = this.getMatches(/\/\/= require <(.*)>/g, filecontent);
    
    deps2.forEach(function(dep, i) {
        var dependency = cwd.concat([dep+'.js']);
        deps2[i] = dependency.join('/');// path.join.apply(null, dependency);
    });
    
    return deps.concat(deps2);
};







module.exports = function(grunt) {
	
  var pkg = grunt.file.readJSON('package.json');
	
	
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat_in_order: {
    	widgets_all: {
	      files: {
	        'build/ergojs-widgets-all.js': ['build-widgets.js']
	      },
	      options: {
			    extractRequired: extractor,
			    extractDeclared: function(filepath) {
			        return [filepath];
			    },
			    onlyConcatRequiredFiles: true      	
	      }    		
    	},
    	// widgets_basic: {
	      // files: {
	        // 'build/ergojs-widgets-basic.js': ['build-widgets-basic.js']
	      // },
	      // options: {
			    // extractRequired: extractor,
			    // extractDeclared: function(filepath) {
			        // return [filepath];
			    // },
			    // onlyConcatRequiredFiles: true      	
	      // }    		
    	// },
    	core: {
	      files: {
	        'build/ergojs-core.js': ['build-core.js']
	      },
	      options: {
			    extractRequired: extractor,
			    extractDeclared: function(filepath) {
			        return [filepath];
			    },
			    onlyConcatRequiredFiles: true      	
	      }
	    },
    	// bootstrap: {
	      // files: {
	        // 'build/ergojs-bootstrap.js': ['bootstrap/bootstrap.js']
	      // },
	      // options: {
			    // extractRequired: bootstrap_extractor,
			    // extractDeclared: function(filepath) {
			        // return [filepath];
			    // },
			    // onlyConcatRequiredFiles: true      	
	      // }
	    // }
    },
    lineremover: {
    	core: {
	      files: {
	        'build/ergojs-core.js': 'build/ergojs-core.js'
	      },
	      options: {
	        exclusionPattern: /^\/\/= require/g
	      }	      
    	},
    	widgets_all: {
	      files: {
	        'build/ergojs-widgets-all.js': 'build/ergojs-widgets-all.js'
	      },
	      options: {
	        exclusionPattern: /^\/\/= require/g
	      }	      
    	},
    	// widgets_basic: {
	      // files: {
	        // 'build/ergojs-widgets-basic.js': 'build/ergojs-widgets-basic.js'
	      // },
	      // options: {
	        // exclusionPattern: /^\/\/= require/g
	      // }	      
    	// },
    	// widgets_bootstrap: {
	      // files: {
	        // 'build/ergojs-bootstrap.js': 'build/ergojs-bootstrap.js'
	      // },
	      // options: {
	        // exclusionPattern: /^\/\/= require/g
	      // }	      
    	// }
    },
		jsdoc : {
        docstrap : {
//            src: ['build/ergojs-core.js', 'build/ergojs-widgets-all.js'], 
            src: ['js/**/*.js'], 
            options: {
                destination: 'docs',
                template: "../ink-docstrap/template",
//                configure: "node_modules/jsdoc/conf.json.EXAMPLE"
                
//                template: '../ink-docstrap/template',
            }
        }
   },
	 concat_css: {
	    options: {
	      // Task-specific options go here.
	    },
	    all: {
	      src: ["css/ergojs-core.css", "css/ergojs-widgets.css"],
	      dest: "build/ergojs.css"
	    }
	  },
	  compress: {
		  main: {
		    options: {
		      archive: 'build/ergojs-'+pkg.version+'.zip'
		    },
		    files: [
		      {expand: true, cwd: 'build/', src: ['ergojs-core.js', 'ergojs-widgets-all.js', 'ergojs.css'], dest: 'ergojs-'+pkg.version+'/'}
		    ]
		  }
		}/*,
	  jsdoc2md: {
      oneOutputFile: {
          src: "build/ergojs-core.js",
          dest: "api/documentation.md"
      }
	  } */
  });
  
//  console.log(grunt.config.get('pkg.version'));
  
  
// 	grunt.log.write( process.cwd() );

//	console.log( grunt.file.exists('js\\core\\array.js') );
  
	grunt.loadNpmTasks('grunt-line-remover');  
  grunt.loadNpmTasks('grunt-concat-in-order');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-compress');  
//	grunt.loadNpmTasks('grunt-jsdoc-to-markdown');  
  
  grunt.registerTask('default', ['concat_in_order', 'lineremover', 'concat_css', 'compress']);
  grunt.registerTask('docs', ['jsdoc']);
  
};
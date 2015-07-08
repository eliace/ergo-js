
var gulp = require('gulp');
var del = require('del');
var concat = require("gulp-concat");
var less = require('gulp-less');
var through2 = require("through2");
var File = require('vinyl');
var path = require('path');
var fs = require('fs');


var dependencies = function() {

	var sources = [];

	var MATCH_REGEXP = /^\/\/= require (.*)$/mg;


	var processDependencies = function(file, callback) {

		var s = String(file.contents);

		var deps = [];


		while(match = MATCH_REGEXP.exec(s)) {
			deps.push(match[1]);
		}


		s = s.replace(MATCH_REGEXP, '');

		file.contents = new Buffer(s);


		var dir = path.dirname(file.path);

		deps.forEach(function(dep) {
			var filepath = path.normalize( path.join(dir, dep+'.js') );
			if( fs.existsSync(filepath) ) {
    		
    		var f = new File({
    			path: filepath,
    			contents: fs.readFileSync(filepath)
    		});

				processDependencies(f, callback);

				callback(f);
    	}

		});

//		callback(file, callback);

	};


	var processFile = function(chunk, enc, callback) {
  	var stream = this;

  	if( chunk.isBuffer() ) {

  		processDependencies(chunk, function(file){

//  			console.log(file.path)

  			if(sources.indexOf(file.path) == -1) {
  				stream.push(file);
  			}

  			sources.push(file.path);
  		});

  		this.push(chunk);

  	}

  	callback();		
	}


	return through2.obj(processFile);
};





gulp.task('scripts', function() {

	gulp.src(["js/core/core.js", "js/data/data.js", "js/layouts/layouts.js", "js/mixins/mixins.js", "js/html/html.js"])
	  .pipe(dependencies())
    .pipe(concat("ergojs-core.js"))
    .pipe(gulp.dest("dist"));

	gulp.src(["js/widgets/widgets.js"])
	  .pipe(dependencies())
    .pipe(concat("ergojs-widgets-all.js"))
    .pipe(gulp.dest("dist"));

});


gulp.task('styles', function() {

	gulp.src(["css/ergojs-layouts.less"])
	  .pipe(less())
    .pipe(concat("ergojs.css"))
    .pipe(gulp.dest("dist"));

});


gulp.task('watch', function() {
	gulp.watch('js/**', ['scripts']);
	gulp.watch('css/**', ['styles']);
});




gulp.task('clear', function() {

	del(['dist/*']);

});



gulp.task('default', ['clear', 'scripts', 'styles']);
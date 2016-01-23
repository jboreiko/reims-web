module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
	ts: {
	    default : {
		src: ["app/**/*.ts", "!app/libs/**/*"],
		outDir: "public/build",
	    },
	    options : {
		target: "es5",
		module: "commonjs",
		sourceMMap: true,
		declaration: true
	    }
	},
	tslint: {
	    options : {
		configuration: "etc/conf/dev_tslint.json"
	    },
	    default : {
		src: ["app/**/*.ts", "!app/libs/**/*"]
	    }
	},
	injector: {
	    options : {
		addRootSlash: false,
		ignorePath: "public"
	    },
	    default : {
		files: {
		    'public/index.html' : ['bower.json', 'public/build/**/*.js', 'public/css/*.css', 'public/bower_components/bootstrap/dist/css/bootstrap.css']
		}
	    }
	},
	copy: {
	    default : {
		files: [
		    {expand: true, flatten: true, src: ['app/index.html'], dest: 'public'}]
	    }
	},
	watch: {
	    default: {
		files: ['app/**/*.ts', 'app/*.html', "!app/libs/**/*"],
		tasks: ['build']
	    }
	},
	compress: {
	    default: {
		options: {
		    archive: 'reims-web.zip'
		},
		files: [
		    {
			src: ['public/**'],
			dest: 'dist'
		    }
		]
	    }
	},
	'github-release': {
	    options: {
		repository: 'jboreiko/reims-web',
		auth: {
		    user: 'jboreiko',
		    password: process.env.GITHUB_TOKEN
		}
	    },
	    files: {
		src: ['dist/reims-web.zip']
	    }
	}
    });

    grunt.registerTask("release", [
	"build",
	"compress",
	"github-release"
    ]);
    
    grunt.registerTask("build", [
	"tslint",
	"ts",
	"copy",
	"injector"
    ]);

    grunt.registerTask("default", [
	"watch"
    ]);

};

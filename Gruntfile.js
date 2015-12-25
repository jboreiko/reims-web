module.exports = function(grunt) {
    grunt.initConfig({
	ts: {
	    default : {
		src: ["app/*.ts"],
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
		src: ["app/*.ts"]
	    }
	},
	injector: {
	    options : {
		addRootSlash: false,
		ignorePath: "public"
	    },
	    default : {
		files: {
		    'public/index.html' : ['bower.json', 'public/build/*.js', 'public/css/*.css', 'public/bower_components/bootstrap/dist/css/bootstrap.css']
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
		files: ['app/*.ts', 'app/*.html'],
		tasks: ['build']
	    }
	}
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-tslint');

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

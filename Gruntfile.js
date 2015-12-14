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
	injector: {
	    options : {
		addRootSlash: false,
		ignorePath: "public"
	    },
	    default : {
		files: {
		    'public/index.html' : ['public/build/*.js', 'bower.json']
		}
	    }
	},
	copy: {
	    default : {
		files: [
		    {expand: true, flatten: true, src: ['node_modules/bootstrap/dist/css/bootstrap.css'], dest: 'public/css'}]
	    }
	}
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-injector');

    grunt.registerTask("default", [
	"ts",
	"copy",
	"injector"
    ]);
};

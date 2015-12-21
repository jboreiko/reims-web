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
		    'public/index.html' : ['bower.json', 'public/build/*.js', 'public/css/*.css']
		}
	    }
	},
	copy: {
	    default : {
		files: [
		    {expand: true, flatten: true, src: ['app/index.html'], dest: 'public'}]
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

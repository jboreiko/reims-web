module.exports = function(grunt) {
    grunt.initConfig({
	ts: {
	    default : {
		src: ["app/*.ts"],
		outDir: "build",
	    },
	    options : {
		target: "es5",
		module: "commonjs",
		sourceMMap: true,
		declaration: true
	    }
	},
	browserify: {
	    default : {
		src: ["build"],
		dest: "public/bundle.js",
	    }
	}
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask("default", [
	"ts",
	"browserify"
    ]);
};

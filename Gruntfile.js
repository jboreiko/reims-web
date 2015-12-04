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
		src: ["app/index.js"],
		dest: "public/bundle.js",
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

    grunt.registerTask("default", [
	"ts",
	"browserify",
	"copy"
    ]);
};

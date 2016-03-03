﻿module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    { cwd: 'node_modules/jquery/dist', src: '**/*', dest: 'build/libraries/jquery', expand: true },
                    { cwd: 'node_modules/bootstrap/dist', src: '**/*', dest: 'build/libraries/bootstrap', expand: true },
                    { cwd: 'node_modules/jquery-ui/themes/base', src: '**/*', dest: 'build/libraries/jquery-ui', expand: true }
                ]
            }
        },
        extractExamples: {
            generate: {
                files: [
                    { src: ['src/dialog/js/*.js'], dest: 'examples/dialog/' },
                    { src: ['src/draggable/js/*.js'], dest: 'examples/draggable/' },
                    { src: ['src/grid/js/*.js'], dest: 'examples/grid/' }
                ]
            }
        },
        concat: {
            dialog: {
                files : {
                    'build/modular/dialog/js/dialog.base.js': ['src/dialog/js/dialog.base.config.js', 'src/dialog/js/dialog.base.events.js', 'src/dialog/js/dialog.base.methods.js', 'src/dialog/js/dialog.base.widget.js'],
                    'build/combined/js/dialog.js': ['build/modular/dialog/js/dialog.base.js'],
                    'build/modular/dialog/css/dialog.base.css': ['src/dialog/css/dialog.base.css'],
                    'build/combined/css/dialog.css': ['build/modular/dialog/css/dialog.base.css'],
                }
            },
            draggable: {
                files: {
                    'build/modular/draggable/js/draggable.base.js': ['src/draggable/js/draggable.base.js'],
                    'build/combined/js/draggable.js': ['src/draggable/js/draggable.base.js']
                }
            },
            grid: {
                files: {
                    'build/modular/grid/js/grid.base.js': ['src/grid/js/grid.base.config.js', 'src/grid/js/grid.base.events.js', 'src/grid/js/grid.base.methods.js', 'src/grid/js/grid.base.widget.js'],
                    'build/modular/grid/js/grid.expandCollapseRows.js': ['src/grid/js/grid.expandCollapseRows.js'],
                    'build/modular/grid/js/grid.inlineEditing.js': ['src/grid/js/grid.inlineEditing.js'],
                    'build/modular/grid/js/grid.pagination.js': ['src/grid/js/grid.pagination.js'],
                    'build/modular/grid/js/grid.responsiveDesign.js': ['src/grid/js/grid.responsiveDesign.js'],
                    'build/modular/grid/js/grid.toolbar.js': ['src/grid/js/grid.toolbar.js'],
                    'build/modular/grid/js/grid.resizableColumns.js': ['src/grid/js/grid.resizableColumns.js'],

                    'build/combined/js/grid.js': ['build/modular/grid/js/grid.base.js', 'build/modular/grid/js/grid.expandCollapseRows.js', 'build/modular/grid/js/grid.inlineEditing.js', 'build/modular/grid/js/grid.pagination.js', 'build/modular/grid/js/grid.responsiveDesign.js', 'build/modular/grid/js/grid.toolbar.js', 'src/grid/js/grid.resizableColumns.js'],

                    'build/modular/grid/css/grid.base.css': ['src/grid/css/grid.base.css'],
                    'build/modular/grid/css/grid.responsiveDesign.css': ['src/grid/css/grid.responsiveDesign.css'],
                    'build/modular/grid/css/grid.pagination.css': ['src/grid/css/grid.pagination.css'],
                    'build/modular/grid/css/grid.resizableColumns.css': ['src/grid/css/grid.resizableColumns.css'],

                    'build/combined/css/grid.css': ['build/modular/grid/css/grid.base.css', 'build/modular/grid/css/grid.responsiveDesign.css', 'src/grid/css/grid.pagination.css', 'src/grid/css/grid.resizableColumns.css']
                }
            }
        },
        replace: {
            minifyComments: {
                src: ['build/modular/*/js/*.js', 'build/combined/js/*.js'], // source files array (supports minimatch)
                overwrite: true, // overwrite matched source files 
                replacements: [{
                    from: /(.|\n|\r)+/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var i,
                            isCommentMode = false,
                            isExtraCommentMode = false,
                            result = '',
                            lines = fullText.split('\n');
                        for (i = 0; i < lines.length; i++) {
                            if (/\/\*\*/g.test(lines[i])) {
                                isCommentMode = true;
                            } else if (/\*.?@/g.test(lines[i])) {
                                isExtraCommentMode = true;
                            }
                            if (isExtraCommentMode === false) {
                                result += lines[i] + '\n';
                            }
                            if (isCommentMode && /\*\//g.test(lines[i])) {
                                isCommentMode = false;
                                isExtraCommentMode = false;
                                result = result.replace(/\n$/, "") + ' */\n';
                            }
                        }
                        return result;
                    }
                }]
            }
        },
        uglify: {
            options: {},
            draggable: {
                files: {
                    'build/combined/js/draggable.min.js': ['build/combined/js/draggable.js'],
                    'build/modular/draggable/js/draggable.base.min.js': ['build/modular/draggable/js/draggable.base.js']
                }
            },
            dialog: {
                files: {
                    'build/combined/js/dialog.min.js': ['build/combined/js/dialog.js'],
                    'build/modular/dialog/js/dialog.base.min.js': ['build/modular/dialog/js/dialog.base.js']
                }
            },
            grid: {
                files: {
                    'build/combined/js/grid.min.js': ['build/combined/js/grid.js'],
                    'build/modular/grid/js/grid.base.min.js': ['build/modular/grid/js/grid.base.js'],
                    'build/modular/grid/js/grid.expandCollapseRows.min.js': ['build/modular/grid/js/grid.expandCollapseRows.js'],
                    'build/modular/grid/js/grid.inlineEditing.min.js': ['build/modular/grid/js/grid.inlineEditing.js'],
                    'build/modular/grid/js/grid.pagination.min.js': ['build/modular/grid/js/grid.pagination.js'],
                    'build/modular/grid/js/grid.responsiveDesign.min.js': ['build/modular/grid/js/grid.responsiveDesign.js'],
                    'build/modular/grid/js/grid.toolbar.min.js': ['build/modular/grid/js/grid.toolbar.js'],
                    'build/modular/grid/js/grid.resizableColumns.min.js': ['build/modular/grid/js/grid.resizableColumns.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    { expand: true, cwd: 'build/combined/css', src: ['*.css', '!*.min.css'], dest: 'build/combined/css', ext: '.min.css' },
                    { expand: true, cwd: 'build/modular/dialog/css', src: ['*.css', '!*.min.css'], dest: 'build/modular/dialog/css', ext: '.min.css' },
                    { expand: true, cwd: 'build/modular/grid/css', src: ['*.css', '!*.min.css'], dest: 'build/modular/grid/css', ext: '.min.css' }
                ]
            }
        },
        watch: {
            files: ['src/**/*.js', 'src/**/*.css'],
            tasks: ['copy', 'extractExamples', 'concat', 'replace', 'uglify', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerMultiTask('extractExamples', 'Extract examples from js files', function () {
        var fs = require('fs');

        this.files.forEach(function (file) {
            fs.readdirSync(file.dest).forEach(function (filename) {
                var filepath = file.dest + filename;
                fs.unlinkSync(filepath);
            });
            grunt.log.writeln('Processing ' + file.src.length + ' files.');
            //file.src is the list of all matching file names.
            file.src.forEach(function (f) {
                var i, isExampleMode, isExampleStart, result, lines, buffer, widget, plugin, alias, field, data, exampleInfo;
                data = fs.readFileSync(f, 'utf8');
                    
                isExampleMode = false;
                lines = data.split('\n');
                result = { text: '', name: '', libs: '' };
                buffer = [];
                for (i = 0; i < lines.length; i++) {
                    if (/\*.?\@widget/g.test(lines[i])) {
                        widget = lines[i].replace(/\*.?\@widget/g, '').trim();
                    } else if (/\*.?\@plugin/g.test(lines[i])) {
                        plugin = lines[i].replace(/\*.?\@plugin/g, '').trim();
                    } else if (/\*.?\@alias/g.test(lines[i])) {
                        alias = lines[i].replace(/\*.?\@alias/g, '').trim();
                    }
                        
                    if (/\*.?\@example/g.test(lines[i])) {
                        isExampleMode = true;
                        isExampleStart = true;
                        if (result) {
                            buffer.push(result);
                        }
                        exampleInfo = lines[i].replace(/\*.?\@example/g, '').trim();
                        result = {
                            text: '',
                            name: '',
                            libs: exampleInfo.indexOf('<') === 0 ? exampleInfo : exampleInfo.substring(exampleInfo.indexOf(' ') + 1),
                            exampleName: exampleInfo.indexOf('<') === 0 ? undefined : exampleInfo.substring(0, exampleInfo.indexOf(' '))
                        };
                    } else if (isExampleMode && /\*\//g.test(lines[i])) {
                        isExampleMode = false;
                        if (result) {
                            buffer.push(result);
                            result = undefined;
                        }
                    }

                    if (isExampleMode) {
                        if (isExampleStart) {
                            isExampleStart = false;
                        } else {
                            result.text += lines[i].trim().replace('*', '') + '\r\n';
                        }
                    } else if (/^\s+[A-Za-z]+\:\s/g.test(lines[i])) {
                        field = alias || lines[i].substr(0, lines[i].indexOf(':')).trim();
                        alias = undefined;
                        writer.updateMissingNames(buffer, widget, plugin, field);
                    } else if (/^\s+self\..+=[ ]function/g.test(lines[i])) {
                        field = alias || lines[i].substring(lines[i].indexOf('.') + 1, lines[i].indexOf('=')).trim();
                        alias = undefined;
                        writer.updateMissingNames(buffer, widget, plugin, field);
                    }
                }
                writer.createHtmlFiles(fs, buffer, file.dest);                 
                return null;
            });
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['copy', 'extractExamples', 'concat', 'replace', 'uglify', 'cssmin', 'watch']);

};


var writer = {
    createHtmlFiles: function (fs, buffer, dest) {
        var i, filename, libs, index = '';
        for (i = 0; i < buffer.length; i++) {
            if (buffer[i].text) {
                filename = buffer[i].name + ".html";
                fs.writeFileSync(dest + filename, writer.buildHtmlFile(buffer[i]));
                index += '<li><a href="' + filename + '">' + buffer[i].name + '</a></li>\r\n';
            }
        }
        if (index) {
            fs.appendFileSync(dest + 'index.html', '<ul>\r\n' + index + '</ul>\r\n');
        }
    },

    updateMissingNames: function (buffer, widget, plugin, field) {
        var j, k = 1;
        for (j = 0; j < buffer.length; j++) {
            if (buffer[j].name === '' && buffer[j].text) {
                buffer[j].name = widget + '.' + plugin.split(' ').join('') + '.' + field + '.' + (buffer[j].exampleName || k);
                k++;
            }
        }
    },

    buildHtmlFile: function (record) {
        return '<html>\r\n' +
            writer.analyzeLibs(record.libs) +
            '<body>\r\n' +
            record.text +
            '</body>\r\n</html>';
    },

    analyzeLibs: function (libs) {
        var i, libs, local = false, result = '<head>\r\n';
        result += '  <meta charset="utf-8" />\r\n';
        result += '  <title>Example</title>\r\n';
        if (local) {
            result += '  <script src="../../build/libraries/jquery/jquery.min.js"></script>\r\n';
        } else {
            result += '  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>\r\n';
        }
        if (libs) {
            names = libs.replace('<!--', '').replace('-->', '').trim().split(',');
            for (i = 0; i < names.length; i++) {
                //include css files
                switch (names[i].trim()) {
                    case 'bootstrap':
                        if (local) {
                            result += '  <link href="../../build/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">\r\n';
                            result += '  <link href="../../build/libraries/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">\r\n';
                        } else {
                            result += '  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">\r\n';
                            result += '  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">\r\n';
                        }
                        break;
                    case 'foundation': 
                        result += '  <link href="http://cdn.foundation5.zurb.com/foundation.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'jqueryui':
                        if (local) {
                            result += '  <link href="../../build/libraries/jquery-ui/jquery.ui.core.css" rel="stylesheet" type="text/css">\r\n';
                            result += '  <link href="../../build/libraries/jquery-ui/jquery.ui.theme.css" rel="stylesheet" type="text/css">\r\n';
                        } else {
                            result += '  <link href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css">\r\n';
                        }
                        break;
                    case 'dialog.base':
                        result += '  <link href="../../build/modular/dialog/css/dialog.base.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid.base':
                        result += '  <link href="../../build/modular/grid/css/grid.base.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid.responsiveDesign':
                        result += '  <link href="../../build/modular/grid/css/grid.responsiveDesign.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid.pagination':
                        result += '  <link href="../../build/modular/grid/css/grid.pagination.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid.resizableColumns':
                        result += '  <link href="../../build/modular/grid/css/grid.resizableColumns.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                }
            }
            for (i = 0; i < names.length; i++) {
                //include js files
                switch (names[i].trim()) {
                    case 'dialog.base':
                        result += '  <script src="../../build/modular/dialog/js/dialog.base.js"></script>\r\n';
                        break;
                    case 'draggable.base':
                        result += '  <script src="../../build/modular/draggable/js/draggable.base.js"></script>\r\n';
                        break;
                    case 'grid.base':
                        result += '  <script src="../../build/modular/grid/js/grid.base.js"></script>\r\n';
                        break;
                    case 'grid.expandCollapseRows':
                        result += '  <script src="../../build/modular/grid/js/grid.expandCollapseRows.js"></script>\r\n';
                        break;
                    case 'grid.inlineEditing':
                        result += '  <script src="../../build/modular/grid/js/grid.inlineEditing.js"></script>\r\n';
                        break;
                    case 'grid.pagination':
                        result += '  <script src="../../build/modular/grid/js/grid.pagination.js"></script>\r\n';
                        break;
                    case 'grid.responsiveDesign':
                        result += '  <script src="../../build/modular/grid/js/grid.responsiveDesign.js"></script>\r\n';
                        break;
                    case 'grid.toolbar':
                        result += '  <script src="../../build/modular/grid/js/grid.toolbar.js"></script>\r\n';
                        break;
                    case 'grid.resizableColumns':
                        result += '  <script src="../../build/modular/grid/js/grid.resizableColumns.js"></script>\r\n';
                        break;
                }
            }
        }
        result += '</head>\r\n';
        return result;
    }
};
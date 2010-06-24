
require 'find'
require 'pathname'


  Dir.mkdir('build') if not File.exist?('build') 


  files = [
    'lib/misc/jquery.json-2.2.min.js',
    'js/core.js',
    'js/event.js',
    'js/data.js',
    'js/widget.js',
    'js/layout.js',
    'js/container.js',
    'js/layouts/plain-layout.js',
    'js/layouts/table-row-layout.js',
    'js/containers/box.js',
    'js/widgets/form.js',
    'js/widgets/images.js',
    'js/widgets/buttons.js',
    'js/widgets/advanced-form.js',
    'js/widgets/grid.js',
  ]


    js = '--js ' + files.join(' --js ') 

    s = "java -jar tools/compiler.jar #{js} --js_output_file build/dino-js.js --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT"



task :compose do
 
    Kernel.system s


end

task :compose_win do
 
    s.gsub!('/', '\\')

    Kernel.system s


end

require 'find'
require 'pathname'


task :compose do


  files = [
    'js/core.js',
    'js/event.js',
    'js/widget.js',
    'js/layout.js',
    'js/container.js',
    'js/layouts/plain-layout.js',
    'js/containers/box.js',
    'js/widgets/form.js',
    'js/widgets/images.js',
    'js/widgets/buttons.js',
    'js/widgets/advanced-form.js',
  ]


    js = '--js ' + files.join(' --js ') 

    s = "java -jar tools/compiler.jar #{js} --js_output_file build/dino-js.js --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT"
    
#    s.gsub!('/', '\\')

    Kernel.system s


end
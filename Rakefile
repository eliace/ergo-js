
require 'find'
require 'pathname'
require 'fileutils'

  Dir.mkdir('build') if not File.exist?('build') 
  
  

  files = [
#    'lib/misc/jquery.json-2.2.min.js',
    'js/core.js',
    'js/events.js',
    'js/data.js',
    'js/widget.js',
    'js/layout.js',
    'js/container.js',
    'js/utils.js',
    'js/layouts/plain-layout.js',
    'js/layouts/table-row-layout.js',
    'js/layouts/3c-layout.js',
    'js/layouts/stack-layout.js',
    'js/layouts/row-layout.js',
    'js/layouts/form-layout.js',
    'js/layouts/dock-layout.js',
    'js/layouts/bar-layout.js',
    'js/containers/box.js',
    'js/containers/tabs.js',
    'js/containers/dropdown.js',
    'js/containers/form.js',
    'js/containers/list.js',
    'js/panels/dialog-panel.js',
    'js/panels/tab-panel.js',
    'js/widgets/form.js',
    'js/widgets/images.js',
    'js/widgets/buttons.js',
    'js/widgets/advanced-form.js',
    'js/widgets/grid.js',
    'js/widgets/menu.js',
    'js/widgets/growl.js',
    'js/widgets/uploader.js',
    'js/widgets/text-item.js',
    'js/widgets/table.js',
    'js/widgets/x-form.js',
    'js/widgets/tree.js',
    'js/widgets/tree-grid.js',
  ]


    js = '--js ' + files.join(' --js ') 

    s = "java -jar tools/compiler.jar #{js} --js_output_file build/dino-js.min.js" # --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT"
    
    
def merge_files(file_list)
  
    out = File.new('build/dino-js.js', 'w')

    file_list.each do |filepath|
      File.open(filepath) do |f|
       out.write f.read(nil)
      end
    end

    out.close
    
    # копируем CSS
#    FileUtils.mkdir('build/css') if not File.exist?('build/css')
    FileUtils.cp 'css/dino-js.css', 'build'
#    FileUtils.cp_r 'lib/misc', 'build'
    
end
    
    
task :compose do
 
    Kernel.system s
    
    merge_files(files);

end

task :compose_win do
 
    s.gsub!('/', '\\')

    Kernel.system s

    merge_files(files);

end
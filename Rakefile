
require 'find'
require 'pathname'
require 'fileutils'

  Dir.mkdir('build') if not File.exist?('build') 
  
  

  files = [
#    'lib/misc/jquery.json-2.2.min.js',
    'js/core/core.js',
    'js/core/events.js',
    'js/core/data.js',
    'js/core/widget.js',
    'js/core/layout.js',
    'js/core/container.js',
    'js/core/utils.js',
    'js/core/states.js',
    'js/layouts/stateful-layout.js',
    'js/layouts/plain-layout.js',
    'js/layouts/3c-layout.js',
    'js/layouts/stack-layout.js',
    'js/layouts/column-layout.js',
    'js/layouts/form-layout.js',
    'js/layouts/dock-layout.js',
    'js/layouts/float-layout.js',
    'js/layouts/window-layout.js',
    'js/containers/box.js',
    'js/containers/tabs.js',
    'js/containers/dropdown.js',
    'js/containers/form.js',
    'js/widgets/images.js',
    'js/widgets/buttons.js',
    'js/widgets/uploader.js',
    'js/widgets/text-item.js',
    'js/widgets/list-item.js',
    'js/widgets/table.js',
    'js/panels/panel.js',
    'js/panels/tab-panel.js',
    'js/form/form.js',
    'js/form/advanced-form.js',
    'js/form/x-form.js',
    'js/grid/grid.js',
    'js/grid/tree-grid.js',
    'js/menu/menu.js',
    'js/tree/tree.js',
    'js/dialog/window.js',
    'js/dialog/dialog.js',
    'js/dialog/message-box.js',
    'js/dialog/growl.js',
    'js/list/list.js',
    'js/list/list-box.js',
  ]


	files_css = [
		'css/common.css',
		'css/layouts.css',
		'css/buttons.css',
	]


    js = '--js ' + files.join(' --js ') 

    s = "java -jar tools/compiler.jar #{js} --js_output_file build/dino-js.min.js" # --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT"
    
    
def merge_files(target, file_list)
  
    out = File.new(target, 'w')

    file_list.each do |filepath|
      File.open(filepath) do |f|
       out.write f.read(nil)
      end
    end

    out.close


#    FileUtils.mkdir('build/css') if not File.exist?('build/css')
#    FileUtils.cp 'css/dino-js.css', 'build'
#    FileUtils.cp_r 'lib/misc', 'build'
    
end
    
    
task :compose do
 
    Kernel.system s
    
    merge_files('build/dino-js.js', files);
    merge_files('build/dino-js.css', files_css);

end

task :compose_win do
 
    s.gsub!('/', '\\')

    Kernel.system s

    merge_files('build/dino-js.js', files);
    merge_files('build/dino-js.css', files_css);

end
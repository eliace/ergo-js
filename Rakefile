
require 'find'
require 'pathname'
require 'fileutils'

  Dir.mkdir('build') if not File.exist?('build') 
  Dir.mkdir('docs') if not File.exist?('docs') 
  
  
  

  files = [
#    'lib/misc/jquery.json-2.2.min.js',
    'js/core/core.js',
    'js/core/events.js',
    'js/core/data.js',
    'js/core/states.js',
    'js/core/widget.js',
    'js/core/layout.js',
    'js/core/container.js',
    'js/core/utils.js',
    'js/core/components.js',
    
    'js/layouts/stateful-layout.js',
    'js/layouts/plain-layout.js',
    'js/layouts/3c-layout.js',
    'js/layouts/stack-layout.js',
    'js/layouts/column-layout.js',
    'js/layouts/form-layout.js',
    'js/layouts/dock-layout.js',
    'js/layouts/float-layout.js',
    'js/layouts/window-layout.js',
    'js/layouts/inherited-layout.js',
    'js/layouts/border-layout.js',
    'js/layouts/hbox-layout.js',
    
    'js/containers/box.js',
    'js/containers/tabs.js',
    'js/containers/dropdown-box.js',
    'js/containers/form.js',
    'js/containers/group-box.js',
    'js/containers/glass-box.js',
    'js/containers/control-box.js',
    
    'js/extensions/selectable.js',
    'js/extensions/editable.js',
    'js/extensions/draggable.js',
    'js/extensions/droppable.js',
    'js/extensions/clickable.js',
    'js/extensions/focusable.js',
    
    'js/widgets/combo-field.js',
    'js/widgets/native.js',
    'js/widgets/images.js',
    'js/widgets/uploader.js',
    'js/widgets/text-item.js',
    'js/widgets/table.js',
    'js/widgets/pager.js',
    'js/widgets/loading.js',
    'js/widgets/list-box.js',
    'js/widgets/select-field.js',
    'js/widgets/editors.js',
    'js/widgets/buttons/text-button.js',
    'js/widgets/buttons/icon-button.js',
    'js/widgets/buttons/dropdown-button.js',
    'js/widgets/fields/text-field.js',
    'js/widgets/fields/dropdown-field.js',
    'js/widgets/fields/spinner-field.js',
    'js/widgets/panels/panel.js',
    'js/widgets/panels/tab-panel.js',
    'js/widgets/dialogs/dialog.js',
    'js/widgets/dialogs/message.js',
    'js/widgets/dialogs/growl.js',
    'js/widgets/grids/grid.js',
    'js/widgets/grids/tree-grid.js',
    'js/widgets/menus/menu-item.js',
    'js/widgets/menus/context-menu.js',
    'js/widgets/trees/tree.js',
#    'js/dialogs/window.js',
#    'js/widgets/list.js',

    'js/framework/application.js',
    
    'js/remote/deferred-result.js',
    'js/remote/json-object.js',
    'js/remote/json-collection.js',
    
    'js/utils/validators.js',
    'js/utils/update-buffer.js',
    'js/utils/formats.js',
    'js/utils/parsers.js',
    'js/utils/profiler.js',
  ]


	files_css = [
		'css/common.css',
		
#    'css/containers/box.css',
#    'css/layouts/stateful-layout.css',
#    'css/layouts/plain-layout.css',
    'css/layouts/3c-layout.css',
#    'css/layouts/stack-layout.css',
#    'css/layouts/column-layout.css',
    'css/layouts/form-layout.css',
    'css/layouts/dock-layout.css',
    'css/layouts/float-layout.css',
    'css/layouts/window-layout.css',
#    'css/layouts/inherited-layout.css',
    'css/layouts/border-layout.css',
    'css/layouts/hbox-layout.css',
    
    'css/containers/tabs.css',
    'css/containers/dropdown-box.css',
#    'css/containers/form.css',
    'css/containers/group-box.css',
    'css/containers/glass-box.css',
    'css/containers/control-box.css',
    
    'css/widgets/native.css',
    'css/widgets/images.css',
    'css/widgets/table.css',
    'css/widgets/text-item.css',
    'css/widgets/list-box.css',
    'css/widgets/combo-field.css',
    'css/widgets/select-field.css',
    'css/widgets/editors.css',
    'css/widgets/loading.css',
    'css/widgets/uploader.css',
    'css/widgets/pager.css',
    'css/widgets/buttons/text-button.css',
    'css/widgets/buttons/icon-button.css',
#    'css/widgets/buttons/dropdown-button.css',
    'css/widgets/fields/text-field.css',
    'css/widgets/dialogs/dialog.css',
    'css/widgets/dialogs/message.css',
    'css/widgets/dialogs/growl.css',
    'css/widgets/grids/grid.css',
    'css/widgets/grids/tree-grid.css',
    'css/widgets/menus/menu-item.css',
    'css/widgets/menus/context-menu.css',
    'css/widgets/panels/panel.css',
    'css/widgets/panels/tab-panel.css',
    'css/widgets/trees/tree.css',
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




def generate_doc(source)
	js_file = Dir.pwd + '/' + source
	doc_dir = Dir.pwd + '/docs'
	Dir.chdir 'tools/jsdoc-toolkit'
	puts %x[java -jar jsrun.jar app/run.js -t=templates/codeview_1.2 -d=#{doc_dir} -p #{js_file}]
end

    
    
task :compose do
 
    Kernel.system s
    
    merge_files('build/dino-js.js', files)
    merge_files('build/dino-js.css', files_css)
#    generate_doc('build/dino-js.js')

end

task :compose_win do
 
    s.gsub!('/', '\\')

    Kernel.system s

    merge_files('build/dino-js.js', files);
    merge_files('build/dino-js.css', files_css);

end
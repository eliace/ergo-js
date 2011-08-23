
#require 'sprockets'
require 'find'
require 'pathname'
require 'fileutils'
require 'date'

Dir.mkdir('build') if not File.exist?('build') 
Dir.mkdir('docs') if not File.exist?('docs') 



class SourceFile
	attr_accessor :dependencies, :path
	
	def initialize(path, load_path)
		@path = path
		@dependencies = []
		
    pn = Pathname.new(path)
		
  	File.open(path, 'r') do |f|
  		until f.eof? do
  			s = f.readline
  			m = /^\/\/= require "(.*)"/.match(s)
  			if m then
  				@dependencies << SourceFile.new( (pn.dirname+m[1]).to_s+pn.extname, load_path )
  			end
  			m = /^\/\/= require <(.*)>/.match(s)
  			if m then
#					puts load_path
  				@dependencies << SourceFile.new( (load_path+m[1]).to_s+pn.extname, load_path )
  			end
  		end
  	end
		
		
		
	end
	
	def collect_files(files)
		
		@dependencies.each {|sf| sf.collect_files(files) }
								
		return if files.include? @path
					
		files << @path
		
		files
	end
	
end





def compose_files(dest, source_files)
	
#	ver = %x[git tag -l].split.last
	ver = '0.7'
	
#	@name = 'ergoo-' + ver
	js_name = "ergo-js.js" #"ergo-#{ver}.js"
	js_name_min = "ergo-js.min.js" #"ergo-#{ver}.min.js"
	css_name = "ergo-js.css"
	
	@target_path = Pathname.new(dest);
	@js_path = Pathname.new('js')
	@css_path = Pathname.new('css')
	@source_files = source_files #['js/**/*.js']#'js/core/widget.js']


	used = []

  Find.find(@js_path) do |path|
    if FileTest.directory?(path)
      if File.basename(path)[0] == ?.
        Find.prune
      else
        next
      end
    else
    	
			match = false
			@source_files.each {|f| match = true if File.fnmatch(f, path) }

#			puts path if not match
     	next if not match 

    	SourceFile.new(path, @js_path).collect_files(used)
    	    	
    end
  end

	File.open(@target_path+js_name, 'w+') do |out|
		
		out.puts "
/**
 * Ergo.js (#{ver})
 * 
 * author: Kodanev Yuriy
 * date: #{Date.today.to_s}
 */
 
 
"		
		used.each do |src|
      File.open(src) do |f|
      	while not f.eof? do
      		s = f.readline
       		out.write s if not /^\/\/= require/ =~ s #f.read(nil)
      	end
     end
		end		
	end

	File.open(@target_path+css_name, 'w+') do |out|
		used.each do |src|
			
			pn = Pathname.new(src).relative_path_from(@js_path)
			src = (@css_path + pn.dirname + pn.basename('.*')).to_s + '.css'
			
			next if not File.exist? src
			
      File.open(src) do |f|
#      	while not f.eof? do
      		out.write f.read(nil)
#      		s = f.readline
#       		out.write s if not /^\/\/= require/ =~ s #f.read(nil)
#      	end
     end
		end		
	end


  s = "java -jar tools/compiler.jar --js #{dest}/#{js_name} --js_output_file #{dest}/#{js_name_min}" # --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT"

	Kernel.system s

	
	FileUtils.cp_r 'themes/default', "#{dest}/theme"
	
	
	
=begin	
	require 'zip/zip'
	require 'zip/zipfilesystem'
	
	
	Zip::ZipFile.open((@target_path+@name).to_s+'.zip', 'w+') do |zipfile|
	  ['build/dino-js.js', 'build/dino-js.css', 'build/dino-js.min.js'].each do |file|
#	    # Create a new entry with some arbitrary name
#	    zos.put_next_entry("some-funny-name.jpg")
	    # Add the contents of the file, don't read the stuff linewise if its binary, instead use direct IO
	    zipfile.add(File.basename(file), file)
	  end
	end
=end	
	
	
	
	
end





task :compose do

	compose_files('build', ['js/**/*.js'])
#	compose_files('build', ['js/widgets/buttons/*.js'])

end


task :compose_win do

	compose_files('build', ['js/**/*.js'])
#	compose_files('build', ['js/widgets/buttons/*.js'])

end




task :compose_custom, :target_dir, :paths do |t, args|
	
	source_paths = (args[:paths] || '').split.map {|s| 'js/'+s+'.js'}
	
	compose_files(args[:target_dir], ['core/container.js']+source_paths)  #'build'['js/**/*.js'])
	
	
end



=begin

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

=end

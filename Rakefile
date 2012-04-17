
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





def compose_files(dest, source_files, postfix='')
	
#	ver = %x[git tag -l].split.last
	ver = '0.7.2'
	
#	@name = 'ergo-' + ver
	js_name = "ergo-js#{postfix}.js" #"ergo-#{ver}.js"
	js_name_min = "ergo-js#{postfix}.min.js" #"ergo-#{ver}.min.js"
	css_name = "ergo-js#{postfix}.css"
	
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

    # добавляем jquery-mousewheel plugin
    File.open('lib/misc/jquery.mousewheel.js') {|io| out.puts io.read }

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

	
#	FileUtils.cp_r 'themes/default', "#{dest}/theme"
	
	
	
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



def generate_doc(source)
  js_file = Dir.pwd + '/' + source
  doc_dir = Dir.pwd + '/docs'
  Dir.chdir 'tools/jsdoc-toolkit'
  puts %x[java -jar jsrun.jar app/run.js -t=templates/codeview_1.2 -d=#{doc_dir} -p #{js_file}]
end




namespace :compose do



  task :all do
  
  	compose_files('build', ['js/**/*.js'])
  #	compose_files('build', ['js/widgets/buttons/*.js'])
  
  end
  
=begin
  task :compose_win do
  
  	compose_files('build', ['js/**/*.js'])
  #	compose_files('build', ['js/widgets/buttons/*.js'])
  
  end
=end
  
  task :basic do
  
    compose_files 'build', ['js/widgets/natives/*.js'], '-basic'
  # compose_files('build', ['js/widgets/buttons/*.js'])
  
  end
  
  
  
  task :custom, :target_dir, :paths do |t, args|
  	
  	source_paths = (args[:paths] || '').split.map {|s| 'js/'+s+'.js'}
  	
  	compose_files(args[:target_dir], ['js/core/widget.js']+source_paths)  #'build'['js/**/*.js'])
  	
  	
  end
  
  
  task :doc do
    generate_doc 'build/ergo-js.js'
  end 



end




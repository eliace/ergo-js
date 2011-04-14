
require 'find'
require 'pathname'
require 'fileutils'

# имя набора указывается в параметра запуска
iconset_name = ARGV[0]


icons_pn = Pathname.new 'icons' #'iconsets/silk/icons'

filenames = []

Find.find(icons_pn.realpath) do |path|
	pn = Pathname.new path
	filenames << {:name => pn.basename('.*').to_s.gsub('_', '-'), :file => icons_pn.join(pn.basename)}
end
	
	filenames.sort! {|a, b| a[:name] <=> b[:name] }

File.open('icons.css', 'w') do |f|
	f.puts ".#{iconset_name}-icon {background-position: 50% 50%; background-repeat: no-repeat;}"
	f.puts
	filenames.each {|s| f.puts ".#{iconset_name}-icon-#{s[:name]} {background-image: url(#{s[:file]});}"}
end




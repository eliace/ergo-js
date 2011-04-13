
require 'find'
require 'pathname'
require 'fileutils'




File.open('iconset.css', 'w') do |f|

	icons_pn = Pathname.new 'iconsets/silk/icons'
	
	filenames = []
	
	Find.find(icons_pn.realpath) do |path|
  	pn = Pathname.new path
  	filenames << {:name => pn.basename('.*').to_s.gsub('_', '-'), :file => 'icons/'+pn.basename}
	end
	
	filenames.sort! {|a, b| a[:name] <=> b[:name] }
	
	filenames.each {|s| f.puts ".silk-icon-#{s[:name]} {background-image: url(#{s[:file]});}"}
	
end




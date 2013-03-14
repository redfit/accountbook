# A sample Guardfile
# More info at https://github.com/guard/guard#readme
guard 'coffeescript', :output => 'app', :bare => true do
  watch(%r{^coffee/(.+)\.coffee$})
end

guard 'livereload' do
  watch(%r{^app/(.+)\.js$})
  watch(%r{^resources/(.+)\.css$})
  watch('app.js')
end

require 'compass'
Compass.add_project_configuration "#{Dir.pwd}/resources/sass/config.rb"
guard 'sass', :input => 'resources/sass', :output => 'resources/css', :compass => true

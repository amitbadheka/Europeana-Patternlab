var http=require("http"),url=require("url"),fs=require("fs"),path=require("path"),port=process.env.PORT||3e3,dataGen=require("./EuHierarchyData"),server=http.createServer(function(request,response){var uri=url.parse(request.url).pathname;"/jquery/jquery.scrollTo-1.4.3.1.js"==uri?uri="../../.."+uri:"/jquery/jquery-1.8.1.js"==uri?uri="../../.."+uri:"/images/spinner.gif"==uri?uri="../../../.."+uri:"/style.css"==uri?uri="../../lib/jstree/css/style.css":"/style-overrides.css"==uri&&(uri="../../lib/jstree/css/style-overrides.css"),console.log("-  uri = "+uri);var filename=path.join(process.cwd(),uri),serverName=request.headers.host,params=url.parse(request.url,!0).query;if(params.requestData){var data=eval(params.requestData);console.log("data = "+JSON.stringify(data)),response.writeHead(200,{"Content-Type":"application/json"}),response.write(JSON.stringify(data)),response.end()}else filename=path.resolve(filename),fs.readFile(filename,"binary",function(a,b){return a?(response.writeHead(500,{"Content-Type":"text/plain"}),response.write("Error reading file "+filename+":\n\nserverName: "+serverName+", uri: "+uri+", params: "+JSON.stringify(params)),response.write(a+"\n"),void response.end()):(response.write(b,"binary"),void response.end())})}).listen(port);console.log("Server running on port "+server.address().port);
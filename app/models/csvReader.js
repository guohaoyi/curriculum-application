var csvParser = require('csv-parse');
var db = require('../../config/db');
var fs = require('fs');

fs.readFile('../../course.csv', {
  encoding: 'utf-8'
}, function(err, csvData) {
  if (err) {
    console.log(err);
  }

  csvParser(csvData, {
    delimiter: ','
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      //console.log(data);
db.connect(db.MODE_TEST, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
      for(var i in data){
          if(data[i][0]=='')
          {
              continue;
          }
          else
          {
              db.get().query("INSERT INTO course VALUES(?,?,?,?)",[data[i][1],data[i][2],data[i][0],data[i][5]],function(err,rows){
                  if(err){
                      console.log(err);
                      return err;
                  }
                  return 0;
              })
          }
      }

    }
    })
  }});
});
var exec = require('child_process').exec,
    fs = require('fs'),
    nconf = require('nconf'),
    q = require('q'),
    spawn = require('child_process').spawn,
    winston = require('winston');

// Logging stuff           
nconf.file({ file: './gebo.json' });
var logLevel = nconf.get('logLevel');
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });

/**
 * Mothballed 2014-9-10
/**
 * Start an unoconv listener
 *
 * @returns promise
 */
//function _startUnoconvListener() {
//    var deferred = q.defer();
//
//    // Get unoconv PID
//    var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//    exec(command, function(err, stdout, stderr) {
//        var unoconvId = stdout;
//    
//        // Get LibreOffice PID
//        command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
//        exec(command, function(err, stdout, stderr) {
//            var sofficeId = stdout;
//
//            // Kill the existing processes
//            command = 'kill ' + unoconvId + ' ' + sofficeId;
//            exec(command, function(err, stdout, stderr) {
//
//                // Start the unoconv listener
//                command = 'unoconv --listener &';
//                var unoconv = spawn('unoconv', ['--listener'], ['&']);
//    
//                // Make sure unoconv is running
//                command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//                exec(command, function(err, stdout, stderr) {
//                    if (stdout == unoconv.pid) {
//                      deferred.resolve();
//                    }
//                    else {
//                      deferred.reject('unoconv not started');
//                    }
//                  });
//              });
//          });
//      });
//
//    return deferred.promise;
//  };
//exports.startUnoconvListener = _startUnoconvListener;

/**
 * Mothballed 2014-9-10
/**
 * See if the unoconv listener is running.
 * If not, execute
 *
 * @returns promise
 */
//function _checkUnoconv() {
//    var deferred = q.defer();
//
//    var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//    exec(command, function(err, stdout, stderr) {
//        if (stdout) {
//          deferred.resolve();
//        }
//        else {
//          _startUnoconvListener().
//            then(function() {
//                deferred.resolve();
//              }).
//            catch(function(err) {
//                // The conversion functions still get a chance to run,
//                // even if the listener isn't started successfully
//                deferred.resolve();
//                //deferred.reject('checkUnoconv: ' + err);
//              });
//        }
//      });
//
//    return deferred.promise;
//  };
//exports.checkUnoconv = _checkUnoconv;

/**
 * Convert a given file from one format to another
 * 
 * @param string
 * @param string
 * @param string
 *
 * @return string
 */
function _convert(path, format, outdir) {
    var deferred = q.defer();

    if (!outdir) {
      outdir = '.';
    }

    var filter = '';
    switch(format) {
        case 'txt':
            filter = ':Text';
            break;
    }

    var command = 'libreoffice --headless --convert-to ' + format + filter + ' --outdir ' + outdir + ' ' + path;
    if (logLevel === 'trace') logger.info('gebo-libreoffice:', command);

    exec(command, function(err, stdout, stderr) {
        if (err) {
          if (logLevel === 'trace') logger.error('gebo-libreoffice:', err);
          deferred.resolve({ error: err });
        }
        else {
          if (logLevel === 'trace' && stderr) logger.warn('gebo-libreoffice:', stderr);
          fs.realpath(outdir, function(err, resolvedPath) {
                deferred.resolve(resolvedPath + '/' +  _getOutputFileName(path, format));
            });
        }
      });

    return deferred.promise;
  };
exports.convert = _convert;


/**
 * Take the incoming filename and its extension
 * and return the hypothetical output filename
 *
 * @param string
 * @param string
 *
 * @return string
 */
function _getOutputFileName(path, extension) {
    var filename = path.split('/');
    filename = filename[filename.length - 1];
    filename = filename.split('.');

    // No extension found
    if (filename.length === 1) {
      return filename[0] + '.' + extension;
    }

    // Hidden file
    if (filename[0] === '') {
      filename = filename.slice(1);
      filename[0] = '.' + filename[0];
      if (filename.length === 1) {
        return filename[0] + '.' + extension;
      }
    }

    filename = filename.slice(0, -1);
    
    return filename + '.' + extension;
  };
exports.getOutputFileName = _getOutputFileName;


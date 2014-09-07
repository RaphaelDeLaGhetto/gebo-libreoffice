var exec = require('child_process').exec,
    q = require('q'),
    spawn = require('child_process').spawn;

/**
 * Start an unoconv listener
 *
 * @returns promise
 */
function _startUnoconvListener() {
    var deferred = q.defer();

    // Get unoconv PID
    var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
    exec(command, function(err, stdout, stderr) {
        var unoconvId = stdout;
    
        // Get LibreOffice PID
        command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
        exec(command, function(err, stdout, stderr) {
            var sofficeId = stdout;

            // Kill the existing processes
            command = 'kill ' + unoconvId + ' ' + sofficeId;
            exec(command, function(err, stdout, stderr) {

                // Start the unoconv listener
                command = 'unoconv --listener &';
                var unoconv = spawn('unoconv', ['--listener'], ['&']);
    
                // Make sure unoconv is running
                command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
                exec(command, function(err, stdout, stderr) {
                    if (stdout == unoconv.pid) {
                      deferred.resolve();
                    }
                    else {
                      deferred.reject('unoconv not started');
                    }
                  });
              });
          });
      });

    return deferred.promise;
  };
exports.startUnoconvListener = _startUnoconvListener;

/**
 * See if the unoconv listener is running.
 * If not, execute
 *
 * @returns promise
 */
function _checkUnoconv() {
    var deferred = q.defer();

    var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
    exec(command, function(err, stdout, stderr) {
        if (stdout) {
          deferred.resolve();
        }
        else {
          _startUnoconvListener().
            then(function() {
                deferred.resolve();
              }).
            catch(function(err) {
                // The conversion functions still get a chance to run,
                // even if the listener isn't started successfully
                deferred.resolve();
                //deferred.reject('checkUnoconv: ' + err);
              });
        }
      });

    return deferred.promise;
  };
exports.checkUnoconv = _checkUnoconv;


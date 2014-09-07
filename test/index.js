var doc = require('..'),
    exec = require('child_process').exec;

/**
 * startUnoconvListener
 */
exports.startUnoconvListener = {

    // Make sure there's no unoconv listener running
    setUp: function(callback) {
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            command = 'kill ' + stdout;
            exec(command, function(err, stdout, stderr) {
                callback();
              });
          });
    },

    'Start an unoconv listener': function(test) {
        test.expect(2);
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            test.equal(stdout, '');

            doc.startUnoconvListener().
                then(function() {
                    test.ok(true);   
                    test.done();                       
                  }).
                catch(function(err) {
                    console.log(err);
                    test.ok(false);   
                    test.done();                       
                  });
          });
    },
};


/**
 * checkUnoconv
 */
exports.checkUnoconv = {

    // Make sure there's no unoconv listener or soffice.bin running
    setUp: function(callback) {
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            var unoconvPid = stdout;

            // Get LibreOffice PID
            command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
            exec(command, function(err, stdout, stderr) {

                // Kill the processes
                command = 'kill ' + unoconvPid + ' ' + stdout;
                exec(command, function(err, stdout, stderr) {
                    callback();
                  });
              });
          });
    },

    'Start listener when necessary': function(test) {
        test.expect(3);
        // Verify that the listener is not running
        var unoconvCommand = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(unoconvCommand, function(err, stdout, stderr) {
            test.equal(stdout, '');

            // Verify that there is no soffice.bin running
            var sofficeCommand = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\'';
            exec(sofficeCommand, function(err, stdout, stderr) {
                test.equal(stdout, '');

                doc.checkUnoconv().
                    then(function() {
                        exec(unoconvCommand, function(err, stdout, stderr) {
                            test.notEqual(stdout, '');   
                            test.done();
                          });
                      }).
                    catch(function(err) {
                        console.log(err);
                        test.ok(false);   
                        test.done();                       
                      });
              });
          });
    },

    'Don\'t restart listener if it\'s already running': function(test) {
        test.expect(2);
        doc.startUnoconvListener().
            then(function() {
                // Get the unoconv PID
                var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
                exec(command, function(err, stdout, stderr) {
                    var pid = stdout;
                    test.notEqual(pid, '');
 
                    doc.checkUnoconv().
                        then(function() {
                            // Ensure the PID is the same
                            // (otherwise a new instance was created)
                            exec(command, function(err, stdout, stderr) {
                                test.equal(pid, stdout);   
                                test.done();                       
                              });
                          }).
                        catch(function(err) {
                            console.log(err);
                            test.ok(false);   
                            test.done();                       
                          });
                  });
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false);
                test.done();
              });
    },
};

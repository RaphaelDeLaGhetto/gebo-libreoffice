var doc = require('..'),
    exec = require('child_process').exec,
    mime = require('mime');

/**
 * startUnoconvListener
 */
//exports.startUnoconvListener = {
//
//    // Make sure there's no unoconv listener running
//    setUp: function(callback) {
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(command, function(err, stdout, stderr) {
//            command = 'kill ' + stdout;
//            exec(command, function(err, stdout, stderr) {
//                callback();
//              });
//          });
//    },
//
//    'Start an unoconv listener': function(test) {
//        test.expect(2);
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(command, function(err, stdout, stderr) {
//            test.equal(stdout, '');
//
//            doc.startUnoconvListener().
//                then(function() {
//                    test.ok(true);   
//                    test.done();                       
//                  }).
//                catch(function(err) {
//                    console.log(err);
//                    test.ok(false);   
//                    test.done();                       
//                  });
//          });
//    },
//};
//
//
///**
// * checkUnoconv
// */
//exports.checkUnoconv = {
//
//    // Make sure there's no unoconv listener or soffice.bin running
//    setUp: function(callback) {
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(command, function(err, stdout, stderr) {
//            var unoconvPid = stdout;
//
//            // Get LibreOffice PID
//            command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
//            exec(command, function(err, stdout, stderr) {
//
//                // Kill the processes
//                command = 'kill ' + unoconvPid + ' ' + stdout;
//                exec(command, function(err, stdout, stderr) {
//                    callback();
//                  });
//              });
//          });
//    },
//
//    'Start listener when necessary': function(test) {
//        test.expect(3);
//        // Verify that the listener is not running
//        var unoconvCommand = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(unoconvCommand, function(err, stdout, stderr) {
//            test.equal(stdout, '');
//
//            // Verify that there is no soffice.bin running
//            var sofficeCommand = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\'';
//            exec(sofficeCommand, function(err, stdout, stderr) {
//                test.equal(stdout, '');
//
//                doc.checkUnoconv().
//                    then(function() {
//                        exec(unoconvCommand, function(err, stdout, stderr) {
//                            test.notEqual(stdout, '');   
//                            test.done();
//                          });
//                      }).
//                    catch(function(err) {
//                        console.log(err);
//                        test.ok(false);   
//                        test.done();                       
//                      });
//              });
//          });
//    },
//
//    'Don\'t restart listener if it\'s already running': function(test) {
//        test.expect(2);
//        doc.startUnoconvListener().
//            then(function() {
//                // Get the unoconv PID
//                var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//                exec(command, function(err, stdout, stderr) {
//                    var pid = stdout;
//                    test.notEqual(pid, '');
// 
//                    doc.checkUnoconv().
//                        then(function() {
//                            // Ensure the PID is the same
//                            // (otherwise a new instance was created)
//                            exec(command, function(err, stdout, stderr) {
//                                test.equal(pid, stdout);   
//                                test.done();                       
//                              });
//                          }).
//                        catch(function(err) {
//                            console.log(err);
//                            test.ok(false);   
//                            test.done();                       
//                          });
//                  });
//              }).
//            catch(function(err) {
//                console.log(err);
//                test.ok(false);
//                test.done();
//              });
//    },
//};

/**
 * convert
 */
exports.convert = {

    /**
     * DOC
     */
    'Convert a DOC to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc.doc', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc.doc', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to an ODT': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc.doc', 'odt').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a DOC to an RTF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc.doc', 'rtf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to text': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc.doc', 'txt').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC without a file extension to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/doc', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * DOCX
     */
    'Convert a DOCX to a DOC': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx.docx', 'doc').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx.docx', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to an ODT': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx.docx', 'odt').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a DOCX to an RTF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx.docx', 'rtf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to text': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx.docx', 'txt').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX without a file extension to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/docx', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * ODT
     */
    'Convert an ODT to a DOC': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt.odt', 'doc').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt.odt', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt.odt', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert an ODT to an RTF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt.odt', 'rtf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to text': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt.odt', 'txt').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT without a file extension to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/odt', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    /**
     * PDF
     */
    'Convert a PDF to a DOC': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf.pdf', 'doc').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf.pdf', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to an ODT': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf.pdf', 'odt').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a PDF to an RTF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf.pdf', 'rtf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to text': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf.pdf', 'txt').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF without a file extension to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/pdf', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    /**
     * RTF
     */
    'Convert a RTF to a DOC': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf.rtf', 'doc').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf.rtf', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to an ODT': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf.rtf', 'odt').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a RTF to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf.rtf', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to text': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf.rtf', 'txt').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an RTF without a file extension to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/rtf', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    /**
     * text
     */
    'Convert text to a DOC': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt.txt', 'doc').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt.txt', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to an ODT': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt.txt', 'odt').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert text to a PDF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt.txt', 'pdf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to an RTF': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt.txt', 'rtf').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text without a file extension to a DOCX': function(test) {
        test.expect(1);
        doc.convert('./test/docs/txt', 'docx').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
};


/**
 * getOutputFileName
 */
exports.getOutputFileName = {

    'Change the file extension to that specified': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/doc.doc', 'pdf');        
        test.equal(filename, 'doc.pdf');
        filename = doc.getOutputFileName('pdf.pdf', 'docx');        
        test.equal(filename, 'pdf.docx');
        test.done();
    },

    'Change the file extension to that specified on an infile with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/doc', 'pdf');        
        test.equal(filename, 'doc.pdf');
        filename = doc.getOutputFileName('pdf.pdf', 'docx');        
        test.equal(filename, 'pdf.docx');
        test.done();
    },

    'Change the file extension to that specified on hidden file with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/.hidden', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden', 'docx');        
        test.equal(filename, '.hidden.docx');
        test.done();
    },

    'Change the file extension to that specified on a hidden file with an extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/.hidden.rtf', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden.pdf', 'docx');        
        test.equal(filename, '.hidden.docx');
        test.done();
    },

    'Should overwrite any unusual extensions': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/somefile.someweirdextension', 'rtf');        
        test.equal(filename, 'somefile.rtf');
        filename = doc.getOutputFileName('somefile.someweirdextension', 'docx');        
        test.equal(filename, 'somefile.docx');
        test.done();
    },
};

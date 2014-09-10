var doc = require('..'),
    exec = require('child_process').exec,
    fs = require('fs'),
    mime = require('mime'),
    rimraf = require('rimraf');

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

    tearDown: function(callback) {
        rimraf('/tmp/gebo-libreoffice', function() {
            callback();
          });
    },

    /**
     * DOC
     */
    'Convert a DOC to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc.doc', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/doc.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc.doc', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/doc.pdf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to an ODT': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc.doc', 'odt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.equal(path, '/tmp/gebo-libreoffice/doc.odt');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a DOC to an RTF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc.doc', 'rtf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.equal(path, '/tmp/gebo-libreoffice/doc.rtf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC to text': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc.doc', 'txt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.equal(path, '/tmp/gebo-libreoffice/doc.txt');

                // There's some weird funky stuff going on here. If you try to read this with
                // utf8 encoding (which seems like the sensible thing to do), it will not 
                // match the expected value, even if you encode that as utf8. If you convert
                // the actual data starting at position 0, you get some weird characters at the
                // start of the string, so you have to start from position 3. What a pain.
                // Who can explain what is happening here?
                //
                // Shouldn't this work, at least? On the surface, the strings are identical
                // test.equal(data.toString('utf8'), new Buffer('This is supposed to be a Microsoft Word doc. It was created with LibreOffice.\n', 'utf8').toString('utf8'));
                var data = fs.readFileSync(path);
                test.equal(data.toString('ascii', 3, data.length), 'This is supposed to be a Microsoft Word doc. It was created with LibreOffice.\n');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOC without a file extension to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/doc', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/doc.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
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
        test.expect(3);
        doc.convert('./test/docs/docx.docx', 'doc', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.equal(path, '/tmp/gebo-libreoffice/docx.doc');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/docx.docx', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/docx.pdf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to an ODT': function(test) {
        test.expect(3);
        doc.convert('./test/docs/docx.docx', 'odt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.equal(path, '/tmp/gebo-libreoffice/docx.odt');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a DOCX to an RTF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/docx.docx', 'rtf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.equal(path, '/tmp/gebo-libreoffice/docx.rtf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX to text': function(test) {
        test.expect(3);
        doc.convert('./test/docs/docx.docx', 'txt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.equal(path, '/tmp/gebo-libreoffice/docx.txt');

                // Weird funky stuff. See DOC tests
                var data = fs.readFileSync(path);
                test.equal(data.toString('ascii', 3, data.length), 'This is supposed to be a Microsoft docx. It was created with Google Docs.\n');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a DOCX without a file extension to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/docx', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/docx.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
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
        test.expect(3);
        doc.convert('./test/docs/odt.odt', 'doc', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.equal(path, '/tmp/gebo-libreoffice/odt.doc');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/odt.odt', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/odt.pdf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/odt.odt', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/odt.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert an ODT to an RTF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/odt.odt', 'rtf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.equal(path, '/tmp/gebo-libreoffice/odt.rtf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT to text': function(test) {
        test.expect(3);
        doc.convert('./test/docs/odt.odt', 'txt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.equal(path, '/tmp/gebo-libreoffice/odt.txt');

                // Weird funky stuff. See DOC tests.
                var data = fs.readFileSync(path);
                test.equal(data.toString('ascii', 3, data.length), 'This is an OpenOffice odt document. It was created with LibreOffice.\n');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an ODT without a file extension to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/odt', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/odt.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
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
        test.expect(3);
        doc.convert('./test/docs/pdf.pdf', 'doc', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.doc');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/pdf.pdf', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to an ODT': function(test) {
        test.expect(3);
        doc.convert('./test/docs/pdf.pdf', 'odt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.odt');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a PDF to an RTF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/pdf.pdf', 'rtf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.rtf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF to text': function(test) {
        test.expect(3);
        doc.convert('./test/docs/pdf.pdf', 'txt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.txt');

                // Weird funky stuff. See DOC tests.
                var data = fs.readFileSync(path);
                test.equal(data.toString('ascii', 3, data.length), 'This is a pdf. It was created with Google Docs.\n');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a PDF without a file extension to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/pdf', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/pdf.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
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
        test.expect(3);
        doc.convert('./test/docs/rtf.rtf', 'doc', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.equal(path, '/tmp/gebo-libreoffice/rtf.doc');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/rtf.rtf', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/rtf.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to an ODT': function(test) {
        test.expect(3);
        doc.convert('./test/docs/rtf.rtf', 'odt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.equal(path, '/tmp/gebo-libreoffice/rtf.odt');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert a RTF to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/rtf.rtf', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/rtf.pdf');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert a RTF to text': function(test) {
        test.expect(3);
        doc.convert('./test/docs/rtf.rtf', 'txt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'text/plain');

                test.equal(path, '/tmp/gebo-libreoffice/rtf.txt');

                // Weird funky stuff. See DOC tests.
                var data = fs.readFileSync(path);
                test.equal(data.toString('ascii', 3, data.length), 'This is an rtf document. It was created with LibreOffice.\n');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert an RTF without a file extension to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/rtf', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/rtf.docx');
                try {
                  fs.openSync(path, 'r');         
                  test.ok(true);                  
                }
                catch (err) {
                  test.ok(false, err);            
                }
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
        test.expect(3);
        doc.convert('./test/docs/txt.txt', 'doc', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/msword');
                test.equal(path, '/tmp/gebo-libreoffice/txt.doc');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/txt.txt', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/txt.docx');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to an ODT': function(test) {
        test.expect(3);
        doc.convert('./test/docs/txt.txt', 'odt', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.oasis.opendocument.text');
                test.equal(path, '/tmp/gebo-libreoffice/txt.odt');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
    
    'Convert text to a PDF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/txt.txt', 'pdf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/pdf');
                test.equal(path, '/tmp/gebo-libreoffice/txt.pdf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text to an RTF': function(test) {
        test.expect(3);
        doc.convert('./test/docs/txt.txt', 'rtf', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/rtf');
                test.equal(path, '/tmp/gebo-libreoffice/txt.rtf');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Convert text without a file extension to a DOCX': function(test) {
        test.expect(3);
        doc.convert('./test/docs/txt', 'docx', '/tmp/gebo-libreoffice').
            then(function(path) {
                test.equal(mime.lookup(path), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                test.equal(path, '/tmp/gebo-libreoffice/txt.docx');
                try {
                  fs.openSync(path, 'r');
                  test.ok(true);
                }
                catch (err) {
                  test.ok(false, err);
                }
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
        var filename = doc.getOutputFileName('/tmp/gebo-libreoffice/doc.doc', 'pdf');        
        test.equal(filename, 'doc.pdf');
        filename = doc.getOutputFileName('pdf.pdf', 'docx');        
        test.equal(filename, 'pdf.docx');
        test.done();
    },

    'Change the file extension to that specified on an infile with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-libreoffice/doc', 'pdf');        
        test.equal(filename, 'doc.pdf');
        filename = doc.getOutputFileName('pdf.pdf', 'docx');
        test.equal(filename, 'pdf.docx');
        test.done();
    },

    'Change the file extension to that specified on hidden file with no extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-libreoffice/.hidden', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden', 'docx');        
        test.equal(filename, '.hidden.docx');
        test.done();
    },

    'Change the file extension to that specified on a hidden file with an extension': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-libreoffice/.hidden.rtf', 'pdf');        
        test.equal(filename, '.hidden.pdf');
        filename = doc.getOutputFileName('.hidden.pdf', 'docx');        
        test.equal(filename, '.hidden.docx');
        test.done();
    },

    'Should overwrite any unusual extensions': function(test) {
        test.expect(2);
        var filename = doc.getOutputFileName('/tmp/gebo-libreoffice/somefile.someweirdextension', 'rtf');        
        test.equal(filename, 'somefile.rtf');
        filename = doc.getOutputFileName('somefile.someweirdextension', 'docx');        
        test.equal(filename, 'somefile.docx');
        test.done();
    },
};

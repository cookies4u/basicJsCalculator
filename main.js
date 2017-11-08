

$(document).ready(function() {

	//var arithmatic = '0';
	var arithmatic = ['', '', ''];
    var regExpAccepted = /[0-9/%*+=.\-]/;
    var regExpNum = /[0-9]/;
    var regExpSymbols = /[/*+\-]/;
    var previousTrack = [];
    var total;

    $(document).on('click', '.clickableButton', function() { 
        var currentValue = $(this).attr('value'); 
        console.log('###### On click button working ######');
        console.log('currentValue click ', currentValue);
        worker(currentValue);
    });

    $(document).on('keypress', function(e) {
        var currentValue = e.key;
        console.log('###### keypress button working ######');
        console.log('currentValue keypress ', currentValue);
        worker(currentValue);
    });

    function worker(value) {
        console.log('arithmatic.length ', arithmatic.length);
        if ( currentValCheck(value) ) {
            arithmaticFunc(value);
        }
    }

    // check that people are using the accepted values
    function currentValCheck(value) { 
        if ( regExpAccepted.test(value) || value === 'Enter' || value === 'neg' || value === 'AC') { // checked and works
            console.log('**** it passed ****');
            return true;
        }
    }

    // DOM minipulation
    function domFunction(value) {
        console.log('im in domFunction ');
        document.getElementById('demo').innerHTML = value;
    }

    // total
    function convertTotal(total) {
        console.log('total ', total);
        total = total.join(',');
        total = total.replace(/[,]/g, '');
        total = eval(total).toFixed(2);
        domFunction(total); // dom
        console.log('total ', total);
        arithmatic[0] = total;
        // arithmatic[2] = '';
        console.log('arithmatic ', arithmatic);
        console.log('total ', total);
        return total;
    }

    // arithmatic
    function arithmaticFunc(value) {
        // clear arithmatic
        if ( value !== 'AC' ) { // if any button clicked ac button becomes c and arithmatic[0] or arithmatic[1] cleared
            document.getElementById('AcButton').innerHTML = 'C';
        }

        // tracking value clicked
        if (previousTrack.length < 2) {
            previousTrack.push(value);
        } 
        else {
            previousTrack[0] = previousTrack[1];
            previousTrack[1] = value;
        }

    	// user clicks a number
    	if ( regExpNum.test(value) ) { // begin test 1
            if ( previousTrack[0] === '=' || previousTrack[0] === 'Enter' ) { // behavior same to AC
                arithmatic[0] = '';
                arithmatic[1] = '';
                arithmatic[2] = '';
            }

    		if (arithmatic[1] === '' ) { // arithmatic = ['', '', '']; arithmatic = ['0', '', ''];
                arithmatic[0] += value;
                domFunction(arithmatic[0]); // dom
                console.log('arithmatic 1 ', arithmatic);
    		}
    		else { // arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0']
                arithmatic[2] += value;
                domFunction(arithmatic[2]); // dom
                console.log('arithmatic 1.2 ', arithmatic);
    		}
    	} // end test 1

        // user clicks decimal point
        else if ( /[.]/.test(value) ) { // begin test 2
            // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
            if ( arithmatic[1] === '') { // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']
                if ( arithmatic[0] === '' ) { // options: arithmatic = ['', '', '']
                    arithmatic[0] = '0.';
                    domFunction(arithmatic[0]); // dom
                }
                else { // options: arithmatic = ['0', '', '']
                    if ( !(/[.]/.test(arithmatic[0])) ) { // don't want to repeat .
                        arithmatic[0] += value;
                        domFunction(arithmatic[0]); // dom
                    }                
                }
            }
            else { // arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0']
                if ( arithmatic[2] === '' ) { // arithmatic = ['0', '+', '']
                    arithmatic[2] = '0.';
                    domFunction(arithmatic[2]); // dom
                }
                else { // arithmatic = ['0', '+', '0']
                    if ( !(/[.]/.test(arithmatic[0])) ) { // don't want to repeat .
                        arithmatic[2] += value;
                        domFunction(arithmatic[2]); // dom
                    }                
                }
            }
        } // end test 2

    	// user clicks arithmatic symbol +-*/
    	else if ( regExpSymbols.test(value) ) { // begin test 3
    		if ( arithmatic[1] === '' ) { // arithmatic = ['', '', ''];
    			if (arithmatic[0] === '' ) { // arithmatic = ['', '', ''];
    				arithmatic[0] = '0';                    
    			}
    			arithmatic[1] = value;
    			console.log('arithmatic 3 ', arithmatic);
    		}
    		else { // arithmatic = ['0', '+', '']; or // arithmatic = ['0', '+', '0']
                if ( arithmatic[2] === '' ) { // arithmatic = ['0', '+', '']
                    arithmatic[1] = value;
                    console.log('arithmatic 4 ', arithmatic);
                }
                else { // arithmatic = ['0', '+', '0']
                    total = convertTotal(arithmatic);
                    arithmatic[1] = value;
                    arithmatic[2] = '';
                    console.log('arithmatic 5 ', arithmatic);
                }
    		}
    	} // end of test 3

        // user clicks equal sign
        else if ( /[=]/.test(value) || value === 'Enter' ) { // begin test 4
            // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
            if ( arithmatic[1] === '' ) { // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; 
                if ( arithmatic[0] === '' ) { // options: arithmatic = ['', '', '']
                    total = 0; // dom doesn't change
                }
                else { // arithmatic = ['0', '', '']; 
                    total = arithmatic[0];
                }
            }   
            else { // arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
                if ( arithmatic[2] === '' ) { // arithmatic = ['0', '+', '']; arithmatic[2] is set equal to arithmatic[0]
                    arithmatic[2] = arithmatic[0];
                }
                total = convertTotal(arithmatic);
            }
        } // end test 4

        // user clicks %
        else if ( /[%]/.test(value) ) { // begin test 5
            // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
            if ( arithmatic[1] === '') { // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']
                if ( arithmatic[0] === '' ) { // options: arithmatic = ['', '', '']
                    total = 0; // dom doesn't change
                }
                else { // options: arithmatic = ['0', '', '']; divide arithmatic[0]/100
                    total = arithmatic[0] + '/' + '100';
                    total = eval(total);
                    arithmatic[0] = total; // make sure if followed by number set to ''
                    console.log('% total ', total);
                }
            }
            else { // ['a', '+', 'b']; arithmatic = ['0', '+-', '']; arithmatic = ['0', '+-', '0']; arithmatic = ['0', '*/', '']; arithmatic = ['0', '*/', '0']
                if ( /[+\-]/.test(arithmatic[1]) ) { // arithmatic = ['0', '+-', '']; arithmatic = ['0', '+-', '0'];
                    if ( arithmatic[2] === '' ) { // arithmatic = ['0', '+-', '']; a + % = a(1+a/100) where arithmatic[0] = a and arithmatic[2] = a * a/100
                        arithmatic[2] = (eval(arithmatic[0] + '*' + arithmatic[0] + '/' + '100')).toString(); // dom will show this
                        domFunction(arithmatic[2]);
                    }
                    else { // arithmatic = ['0', '+-', '0']; a + % = a(1+b/100) where arithmatic[0] = a and arithmatic[2] = a * a/100
                        arithmatic[2] = (eval(arithmatic[0] + '*' + arithmatic[2] + '/' + '100')).toString(); // dom will show this
                        domFunction(arithmatic[2]);
                    }
                }
                if ( /[*/]/.test(arithmatic[1]) ) { // arithmatic = ['0', '*/', '']; arithmatic = ['0', '*/', '0']
                    if ( arithmatic[2] === '' ) { // arithmatic = ['0', '*/', '']; a * % = a*(a/100) where arithmatic[0] = a and arithmatic[2] = a/100
                        arithmatic[2] = (eval(arithmatic[0] + '/' + '100')).toString(); // dom will show this
                    }
                    else { // arithmatic = ['0', '*/', '0']; a * % = a*(b/100) where arithmatic[0] = a and arithmatic[2] = b/100
                        arithmatic[2] = (eval(arithmatic[2] + '/' + '100')).toString(); // dom will show this
                    }
                }
            }
        } // end test 5

        // user clicks +/-
        else if ( value === 'neg') { // begin test 6
            if ( previousTrack[0] === '=' || previousTrack[0] === 'Enter' ) {
                arithmatic[0] = '';
                arithmatic[1] = '';
                arithmatic[2] = '';
            }
            // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
            if (arithmatic[1] === '' ) { // ['', '', '']; arithmatic = ['0', '', '']
                if ( arithmatic[0] === '' ) {  // { '', '', '']                  
                    arithmatic[0] = '0';
                }
                if ( /[-]/.test(arithmatic[0]) ) {
                    arithmatic[0] = arithmatic[0].replace(/[\-]/g, '');
                    domFunction(arithmatic[0]);
                    console.log('arithmatic 6 ', arithmatic);
                }
                else {
                    arithmatic[0] = '-' + arithmatic[0];
                    domFunction(arithmatic[0]);
                    console.log('arithmatic 7 ', arithmatic);
                }
            }
            else { // arithmatic = ['0', '+', ''];
                if ( arithmatic[2] === '') {
                    arithmatic[2] = 0;
                }
                if ( /[-]/.test(arithmatic[2]) ) {
                    arithmatic[2] = arithmatic[2].replace(/[\-]/g, '');
                    domFunction(arithmatic[2]);
                    console.log('arithmatic 8 ', arithmatic);
                }
                else {
                    arithmatic[2] = '-' + arithmatic[2];
                    domFunction(arithmatic[2]);
                    console.log('arithmatic 9 ', arithmatic);
                }
            }
        } // end test 6
        
        // user clicks AC
        else if ( value = 'AC') { // begin test 7
            domFunction('0');
            // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']; arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
            if ( arithmatic[1] === '' ) { // options: arithmatic = ['', '', '']; arithmatic = ['0', '', '']
                arithmatic[0] = '';
                console.log('arithmatic 10 ', arithmatic);
                
            }
            else { // arithmatic = ['0', '+', '']; arithmatic = ['0', '+', '0'] 
                arithmatic[2] = '';
                console.log('arithmatic 11 ', arithmatic);
            }
            if ( previousTrack[0] === 'AC' ) {
                arithmatic[0] = '';
                arithmatic[1] = '';
                arithmatic[2] = '';
                console.log('arithmatic 12 ', arithmatic);
                document.getElementById('AcButton').innerHTML = 'AC';
            }
        } // end test 7

    } // end function


});

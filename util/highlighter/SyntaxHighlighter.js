    //Required for the clipboard to work on non-IE browsers. MAKE SURE PATH POINTS TO clipboard.swf
    dp.SyntaxHighlighter.ClipboardSwf = './js/clipboard.swf';

    //Highlights the code and write the resulting html out to result textarea.
    function staticallyConvertCode()
    {
        //The classname of the highlighted code element
        highlightedClassName = "dp-highlighter";

        //First we need to extract all option values and correctly construct
        //syntax highlighter's class string, which defines the options.
        classString = "";
        classString += document.sourcecodeform.language.value;

        //Construct the first line option
        firstline = document.sourcecodeform.firstline.value;
        if( isNaN(firstline) )
        {
            alert( "First Line Number must be a number" );
            return;
        }
        classString += ":firstline[" + firstline + "]";

        //Construct the no gutter option
        if( document.sourcecodeform.gutter.value === "false" )
        {
            classString += ":nogutter";
        }

        //Construct the showcontrols option
        if( document.sourcecodeform.showcontrols.value === "false" )
        {
            classString += ":nocontrols";
        }

        //Construct the nocollapse option
        if( document.sourcecodeform.nocollapse.value === "false" )
        {
            classString += ":collapse";
            //This is how syntax highlighter marks things as collapsed
            highlightedClassName = "dp-highlighter collapsed";
        }

        //Construct the hidecolumns option
        if( document.sourcecodeform.hidecolumns.value === "false" )
        {
            classString += ":showcolumns";
        }

        //Set up for blogger mode if neccessary
        if( document.sourcecodeform.blogger.value === "false" )
        {
            dp.SyntaxHighlighter.BloggerMode(false);
        } else {
            dp.SyntaxHighlighter.BloggerMode(true);
        }

        //Secondly, we need to extract the source code to be converted convert and convert it.

        //Extract the source code to be converted.
        //Escape the ampersand character and less-than character so that they will display correctly in
        //the textarea.  If the less-than character is not escaped, then the textarea might be prematurely
        //closed.  If the ampersand character is not escaped, then '&lt;' in the source code will be replaced
        //by the less-than character when displayed via the view plain command.
        var originalCode = document.sourcecodeform.sourcecode.value.replace(/&/g,'&amp;').replace(/</g,'&lt;');

        //Reset the current pre code area and set the code div with the converted original code.
        //This is what the syntax highlighter will highlight.
        //This is one line because internet explorer can not find elements by name
        document.getElementById('codearea').innerHTML = "<pre name=\"code\" class=\""+classString+"\">"+originalCode+"</pre>";

        //Highlight the code in the <pre> code div.
        dp.SyntaxHighlighter.HighlightAll('code');

        //Thirdly, we need to inject the header to the highlighted code if neccessary.
        header = document.sourcecodeform.header.value;
        if( header !== "" )
        {
            el = getCodeElement('\\btools\\b');
            el.innerHTML = "<div class=\"header\">"+header+"</div>" + el.innerHTML;
        }

        //Fourthly, we need to inject the original source code so the menu items will work on a different page.

        //Get the resulting highlighted code element
        highlightedElement = getCodeElement('\\bdp-highlighter\\b');

        //Add a hidden textarea containing the original source code to the
        //prettied code so that the menu buttons will work later.
        highlightedElement.innerHTML += "<textarea style='display:none;' class='originalCode'>"+originalCode+"</textarea>";

        //Finally, we need to extract the highlighted code html source and write it to the results box
        document.getElementById('content').value = "<div class=\""+highlightedClassName+"\">" + highlightedElement.innerHTML + "</div>";
        document.getElementById("AddProgramButton").disabled=false;
    }

    //Gets a subelement of the codearea node whose classname matched the test parameter
    function getCodeElement(test)
    {
        node = document.getElementById('codearea');
        var a = [];
        var re = new RegExp(test);
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))
                return els[i];
    }
# serenix_indented_data
Contains class utilities to parse indented text data. Useful to parse tree data or tree grid data from flat indented text data.


## DataType class
Contains following string conversion methods:
- toInteger : returns a javascript integer if the string value corresponds to a int, long, byte, short, binary, unsigned int, unsigned short, unsigned byte unsigned long. Otherwise, throws an exception.
- toInt
- toShort
- toByte
- toLong
- toNumber
- toFloat
- toDouble
- toLongDouble
- toUnsignedInt
- toUnsignedShort
- toUnsignedByte
- toUnsignedLong
- toUnsignedNumber
- toUnsignedFloat
- toUnsignedDouble
## ITextData class
Contains following parse methods:
- parse:
Parses the given indented string data.
 <p>When options argument is specified and it's a plain object and has one of the following 'nameField', 'itemsField', 'childrenField' or 'fields', each parsed node/item will have a "name" field and a "children" field.</p>
 <p>When options fields property is defined and is an array, each parsed 
 node/item will have fields with names in the array.</p>
 <p>The final names of "name" field and a "children" field will be given by 
 the value of nameField and childrenField of the options or fields when 
 defined.</p>
**Parameters**:
 - **data**: 
   *Type*;String
   *Description*: The indented string data to parse.
 - **options**
    *Type*: Plain object or Number
    *Description*
    <p>When the value of options argument is a number, it represents the 
    number of spaces of a tabulation.</p>
    <p>When the value of options argument is a plain object, it represents options (childrenField, nameField, ...) to use when parsing. The parsing method it's ITextData.kvParse (key-value parse).</p>
**Return type**: Array
- kvParse

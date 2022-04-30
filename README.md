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
- parse
- kvParse

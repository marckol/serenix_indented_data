var globalNS = typeof window !== 'undefined' ? window : 
		typeof global !== 'undefined' ? global : 
		typeof self !== 'undefined' ? self : this;

(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'DataType', function() {
	function DataType() {
		
	}
	
	DataType.__CLASS__ = DataType.prototype.__CLASS__ = DataType;
	
	DataType.__CLASS_NAME__ = DataType.prototype.__CLASS_NAME__ = "DateType";
	
	function toNumber(str, base) {
		var v = parseFloat(str, base||10);
		if (isNaN(v)) throw new Error("Incorrect int value: " + str);
		return v;
	}
	
	function toFloat(str, base) {
		if (str) {
			var v = parseFloat(str, base||10);
			if (isNaN(v)) {
				throw new Error("Incorrect int value: " + str);
			}
			if (-3.4E+38 > v || v > 3.4E+38) {
				throw new Error("Out of bounds value: " + v);
			}
			return v;
		}
	}

	function toDouble(str, base) {
		if (str) {
			var v = parseFloat(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (-1.7E+308 > v || v > 1.7E+308) throw new Error("Out of bounds value: " + v);
			return v;
		}
	} 
	function toUnsignedDouble(str, base) {
		if (str) {
			var v = parseFloat(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (0 > v || v > 3.4E+308) throw new Error("Out of bounds value: " + v);
			return v;
		}
	} 
	
	function toLongDouble(str, base) {
		if (str) {
			var v = parseFloat(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (-1.1E+4932 > v || v > 1.1E+4932) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}
	function toInteger(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			return v;
		}
	}
	function toInt(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (-2147483648 > v || v > 2147483647) throw new Error("Out of bounds value: " + v);
			return v;
		}
	} 
	
	function toUnsignedInt(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (0 > v || v > 4294967295) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}

	function toLong(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (-922337203854775808 > v || v > 92233720368775807) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}
	
	function toUnsignedLong(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (0 > v || v > 18446744073709551615) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}

	function toShort(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect int value: " + str);
			if (-32,768 > v || v > 32,767) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}
	
	function toUnsignedShort(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect unsigned byte value: " + str);
			if (v < 0 || v > 65535) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}

	function toByte(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect byte value: " + str);
			if (v < -128 || v > 128) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}

	function toUnsignedByte(str, base) {
		if (str) {
			var v = parseInt(str, base||10);
			if (isNaN(v)) throw new Error("Incorrect unsigned byte value: " + str);
			if (v < 0 || v > 255) throw new Error("Out of bounds value: " + v);
			return v;
		}
	}
	
	function parseValue(token, type) {
		switch ((type||'string').replace(/[ _-]+/, "").toLowerCase()) {
			case 'string':
			case 'text':
				v = token;break;
			case 'number':
			case 'numeric':
			case 'real':
			case 'decimal':
				v = toNumber(token, 10);break;
			case 'float':
				v = toFloat(token, 10);break;
			case 'double':
				v = toDouble(token, 10);break;
			case 'longdouble':
				v = toLongDouble(token, 10);break;					
			case 'int':
			case "int32":
				v = toInt(token, 10);break;
			case 'integer':
				v = toIntegere(token, 10);break;
			case 'long':
			case 'int64':
			case 'longlong':
			case 'longint':
				v = toLong(token, 10);break;
			case 'unsignedlong':
				v = toUnsignedLong(token, 10);break;
			case 'short':
			case 'shortint':
				v = toShort(token, 10);break;
			case 'unsignedshort':
			case 'unsignedshortint':
				v = toUnsignedShort(token, 10);break;
			case 'byte':
				v = toByte(token, 10);break;
			case 'unsignedbyte':
			case 'ubyte':
				v = toUnsignedByte(token, 10);break;
			case "boolean":
			case "bool":
				v = /^(?:true|1)$/i.test(token )? true : /^(?:false|0)$/i.test(token ) ? false : (function() {throw new Error("Incorrect value");})();break;
			case "binary":
				v = '1' === token ? 1 : 0 === token ? 0 : (function() {throw new Error("Incorrect value");})();break;
			case "datetime":
			case "date":
			case "time":
				
			default:
				throw new Error("Type not supported");
		}
		return v;
	}
	
	
	DataType.toNumber = toNumber;
	
	DataType.toFloat = toFloat;

	DataType.toDouble = toDouble;
	
	DataType.toLongDouble = toLongDouble;
	
	DataType.toInt = toInt;
	
	DataType.toInteger = toInteger;

	DataType.toLong = toLong;

	DataType.toShort = toShort;

	DataType.toByte = toByte;
	
	
	DataType.toUnsignedInt = toUnsignedInt;

	DataType.toUnsignedLong = toUnsignedLong;

	DataType.toUnsignedShort = toUnsignedShort;

	DataType.toUnsignedByte = toUnsignedByte;

	DataType.toUnsignedDouble = toUnsignedDouble;
	
	DataType.parseValue = parseValue;
	
	DataType.CONVERT_FUNCTIONS = ["toNumber", "toFloat", "toDouble", "toLongDouble", "toInt", "toLong", "toShort", "toByte", "toUnsignedInt", "toUnsignedLong", "toUnsignedShort", "toUnsignedByte", "parseValue", "toUnsignedDouble"];
	DataType["export"] = function(own, members) {
		var self = this, x;
		if (isArray(own)) {
			x = own;
			own = members;
			members = x;
		}
		own = own||globalNS;
		members = members||["toNumber", "toFloat", "toDouble", "toLongDouble", "toInt", "toLong", "toShort", "toByte", "toUnsignedInt", "toUnsignedLong", "toUnsignedShort", "toUnsignedByte", "toUnsignedByte", "parseValue", "toUnsignedDouble"];
		members.forEach(function(m) {
			own[m] = self[m];
		});
		return  own;
	};
	
	DataType.keys = function() {
		var ks = [], k;
		for (k in this) {
			if (['prototype', '_proto_', '__', '__CLASS__', '__CLASS_NAME__'].indexOf(k) < 0) {
				ks.push(k);
			}
		}
		return ks;
	};
	
	DataType.exportAll = function(own) {
		return this["export"](own, this.__CLASS__.keys());
	};
	
	return DataType;
});
//requires serenix_data_type.js

(function(root, name, factory) {
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([name], factory);
	} else {
		root[name] = factory();
	}
	
})(this, 'ITextData', function() {
	
	function isPlainObj(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}

	var isArray = typeof Array.isArray === 'function' ? function(a) {
		return Array.isArray(a);
	} : function(a) {
		return Object.prototype.toString.call(a) === '[object array]';
	};

	function ITextData(data) {
		if (arguments.length >= 1) {
			this.setData(data);
		}
	};

	var toNumber =  DataType.toNumber, 
		toFloat =  DataType.toFloat, 
		toDouble =  DataType.toDouble, 
		toLongDouble =  DataType.toLongDouble, 
		toInt =  DataType.toInt, 
		toInt =  DataType.toInteger,
		toLong =  DataType.toLong, 
		toShort =  DataType.toLong, 
		toByte = DataType.toByte,
		toUnsignedInt = DataType.toUnsignedInt, 
		toUnsignedLong =  DataType.toUnsignedLong, 
		toUnsignedShort =  DataType.toUnsignedShort, 
		toUnsignedByte =  DataType.toUnsignedByte,
		parseValue =  DataType.parseValue, 
		toUnsignedDouble =  DataType.toUnsignedDouble;



	ITextData.prototype.getData = function() {
		return this.__data_;
	};

	ITextData.prototype.setData = function(data) {
		if (data instanceof String) data = data.valueOf();
		if (typeof data === 'string') {
			this.__data_ = data;
			this.__node__ = parse(data);
		}
		return this;
	};

	


	function parse(data, tabSpaces, options) {
		var x, nodeFactory, t;
		if (arguments.length === 2) {
			if (typeof tabSpaces === 'object') {
				options = tabSpaces;
				tabSpaces = 4;
			}
		}
		options = options||{};
		var createNode = (t = typeof (nodeFactory = options.nodeFactory)) === 'object' ? function(key) {
			return nodeFactory.create(key);
		} : t === 'function' ? nodeFactory : options.createNode ? function(key) {
			return options.createNode(key);
		} : function createNode(parent) {
			node = { };
			node[key] = [];
			if (parent) {
				parent[Object.keys(parent)[0]].push(node);
			}
		}
		function put() {
			var parent, i, ndx;	
			if (lastIndent == undefined) {
				paths.push(indent);
			} else if (indent > lastIndent) {
				parent = levels[lastIndent];
				paths.push(indent);
			} else if (indent === lastIndent) {
				if (indent === firstLevel) {
					levels = {};
					parent = undefined;
					createNode();
					result.push(levels[indent] = node);
					return;
				} else {
					parent = levels[paths[paths.indexOf(indent) - 1]];
				}
			} else {
				ndx = paths.indexOf(indent);
				if (ndx < 0) {
					throw new Error("Incorrect indentation");
				}
				paths.splice(i = ndx + 1, paths.length - i);	
				parent = levels[paths[ndx - 1]];
						
			}
			createNode(parent);
			if (!lastKey) {
				firstLevel = indent;
				result = [node];
			}
			levels[indent] = node
		}
		var paths = [];
		var node, key, lastKey, indent, lastIndent, i, n, ch, items, result;
		tabSpaces = tabSpaces||options.tabSpaces||4;
		var pipe = {}, firstLevel;
		var levels = {};
		data.split(/\r\n?|\n/).forEach(function(line) {
			i = 0;
			n = line.length;
			indent = 0;
			for (;i<n;i++) {
				if ((ch = line[i]) === ' ') {
					indent++;
				} else if (ch === '\t') {
					indent += tabSpaces - (indent % tabSpaces);
				} else {
					key = line.substring(i).trim();
					put();
					lastIndent = indent;
					lastKey = key;
					break;
				}
			}
		});
		return result;
	}


	function kvParse(data, tabSpaces, options) {
		var x, nodeFactory, t;
		if (typeof tabSpaces !== 'number') {
			x = tabSpaces;
			tabSpaces = options;
			options = x;
		}
		var createNode;
		function put() {
			var parent;
			node = createNode(key);
			if (!lastKey) {
				firstLevel = indent;
				result = [node];
			}
					
			var parent, i, index;	
			if (lastIndent == undefined) {
				paths.push(indent);
				firstIndent = indent;
			} else if (indent > lastIndent) {
				parent = levels[lastIndent];
				paths.push(indent);
			} else if (indent === lastIndent) {
				if (indent === firstLevel) {
					levels = {};
					parent = undefined;
					result.push(levels[indent] = node);
					return;
				} else {
					parent = levels[paths[paths.indexOf(indent) - 1]];
				}
			} else {
				if (indent <= firstIndent) {
					firstIndent = indent;
					levels = {};
					parent = undefined;
					result.push(levels[indent] = node);
					return;
				}
				index = paths.indexOf(indent);
				if (index < 0) {
					throw new Error("Incorrect indentation");
				}
				paths.splice(i = index + 1, paths.length - i);	
				parent = levels[paths[paths.indexOf(indent) - 1]];
			}
			if (parent) { //set parent and check it's a valid parent
				node.parent = parent;
				addChild(parent, node);
			}
			levels[indent] = node;
		}
		var paths = [];
		var node, key, lastKey, indent, lastIndent, i, n, ch, items, result, firstIndent;
		var pipe = {}, firstLevel, nameField, itemsField, addChildMethod, fields;
		var levels = {}, delim;
		function validate(v, required) {
			if (required && (v == undefined || v === "")) throw new Error("Undefined value or empty value");
			return v;
		}
		options = options||{};
		addChild = options.addChild||options.addChildNode||options.addChildElement;
		addChildMethod = options.addChildMethod||options.addChildMethodName;
		tabSpaces = tabSpaces||options.tabSpaces||4;
		fields = options.fields||options.columns;
		createNode = (t = typeof (nodeFactory = options.nodeFactory)) === 'object' ? function(key) {
			return nodeFactory.create(key);
		} : t === 'function' ? nodeFactory : options.createNode ? function(key) {
			return options.createNode(key);
		} : undefined;
			
		if (isArray(fields)) {
			delim = options.delim||options.delimiter||options.separator||"|";
			delim = delim instanceof RegExp ? delim : new RegExp(delim.replace(/\||\[|\]|\{|\}|\(|\)/g, function($) { return "\\" + $;}));
			if (!createNode) createNode = function(key) {
				var tokens = key.split(delim), node = {}, field;
				tokens.forEach(function(token, i) {
					field = fields[i];
					if  (typeof field === 'string') {
						node[field] = token;
					} else if (isPlainObj(field)) {
						node[field.name] = validate(parseValue(token, field.type), field.required);
					} else if (isArray(field)) {
						node[field[0]] = validate(parseValue(token, field[1]||'string'), field[2]);
					} else {
						throw new Error("Incorrect field");
					}
				});
				return node;
			}
			itemsField = options["itemsField"]||options["childrenField"]
		} else {
			if (isPlainObj(fields)) {
				nameField = fields["nameField"]||fields["name"],
				itemsField = fields["itemsField"]||fields["childrenField"]||fields["items"]||fields["children"]||fields["childNodes"];
			}
			if (!itemsField) {
				itemsField = options["itemsField"]||options["childrenField"]||"items";
			}
			if (!nameField) {
				nameField = options["nameField"]||"name";
			}
			if (!createNode) createNode = function(key) {
				node = { };
				node[nameField] = key;
				node[itemsField] = [];
				return node;
			}
		}
		addChild = typeof addChild === 'function' ? addChild : 
			typeof addChild === 'string' ? function(parent, node) {
				parent[addChild](node);
			} :
			typeof addChildMethod === 'function' ? addChildMethod : 
			typeof addChildMethod === 'string' ? function(parent, node) {
				parent[addChildMethod](node);
			} : typeof itemsField === 'string' || itemsField instanceof String ? function(parent, node) {
				(parent[itemsField]||(parent[itemsField] = [])).push(node);
			} : addChildMethod || addChild ? function(parent, node) {
				throw new Error("Incorrect parse arguments");
			} : function(parent, node) {
				(parent.children||(parent.children = [])).push(node);
			};
		
		data.split(/\r\n?|\n/).forEach(function(line) {
			i = 0;
			n = line.length;
			indent = 0;
			for (;i<n;i++) {
				if ((ch = line[i]) === ' ') {
					indent++;
				} else if (ch === '\t') {
					indent += tabSpaces - (indent % tabSpaces);
				} else {
					key = line.substring(i).trim();
					put();
					lastIndent = indent;
					lastKey = key;
					break;
				}
			}
		});
		return result;
	}


	/**
	 * Parses the given indented string data.
	 * <p>When options argument is specified and it's a plain object and has one 
	 * of the following 'nameField', 'itemsField', 'childrenField' or 'fields',
	 * each parsed node/item will have a "name" field and a "children" field.</p>
	 * <p>When options fields property is defined and is an array, each parsed 
	 * node/item will have fields with names in the array.</p>
	 * <p>The final names of "name" field and a "children" field will be given by 
	 * the value of nameField and childrenField of the options or fields when 
	 * defined.</p>
	 * @param {String} data The indented string data to parse.
	 * @param {Object|Number} [options] 
	 *    <p>When the value of options argument is a number, it represents the 
	 *    number of spaces of a tabulation.</p>
	 *    <p>When the value of options argument is a plain object, it represents 
	 *     options (childrenField, nameField, ...) to use when parsing. The parsing
	 *     method it's ITextData.kvParse (key-value parse).</p>
	 * @return {Array}
	 */
	ITextData.parse = function(data, options) {
		if (typeof options === 'number') {
			if (options < 0) {
				throw new Error("Incorrect arguments");
			}
			return parse(data, /*tabSpaces*/options);
		} else if (options) {
			options = typeof options === 'object' ? options : {};
			return options.nameField || (options.childrenField||options.itemsField) || options.createNode ? kvParse(data, options) : parse(data, options);
		}
		return parse(data);
	};

	ITextData.kvParse = kvParse;
	
	ITextData.toNumber = toNumber;
	
	ITextData.toFloat = toFloat;

	ITextData.toDouble = toDouble;
	
	ITextData.toLongDouble = toLongDouble;
	
	ITextData.toInt = toInt;

	ITextData.toLong = toLong;

	ITextData.toShort = toShort;

	ITextData.toByte = toByte;
	
	
	ITextData.toUnsignedInt = toUnsignedInt;

	ITextData.toUnsignedLong = toUnsignedLong;

	ITextData.toUnsignedShort = toUnsignedShort;

	ITextData.toUnsignedByte = toUnsignedByte;
	
	ITextData.parseValue = parseValue;
	
	ITextData.toUnsignedDouble = toUnsignedDouble;
	
	if (typeof SereniX === 'undefined') {
		(function(root, name, factory) {
			if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
				module.exports = factory();
			} else if (typeof define === 'function' && define.amd) {
				define([name], factory);
			} else {
				root[name] = factory();
			}
			
		})(this, 'SereniX', function() {
			return { ITextData : ITextData };
		});
	} else if (typeof SereniX.Namespace === "function") {
		SereniX.addChild(ITextData);
	} else {
		SereniX.ITextData = ITextData;
	}
	//exports to the global namespace
	return ITextData;
});
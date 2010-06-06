var Dino = function() {
  var D = {};
  D.override = function(obj, overrides) {
    for(var i in overrides) {
      obj[i] = overrides[i]
    }return obj
  };
  D.merge = D.override;
  D.extend = function(p_ctor, ctor, overrides) {
    if(typeof ctor == "object") {
      overrides = ctor;
      ctor = function() {
        p_ctor.apply(this, arguments)
      }
    }var F = function() {
    };
    F.prototype = p_ctor.prototype;
    ctor.prototype = new F;
    ctor.prototype.constructor = ctor;
    ctor.superclass = p_ctor.prototype;
    ctor.super_ctor = p_ctor;
    D.override(ctor.prototype, overrides);
    return ctor
  };
  var _dtypes = {};
  D.declare = function(class_name, base_class, overrides, dtype) {
    var clazz = D.extend(base_class, overrides);
    var cp_a = class_name.split(".");
    var cp = "window";
    for(var i = 0;i < cp_a.length;i++) {
      cp += "." + cp_a[i];
      eval("if(!" + cp + ") " + cp + " = {};")
    }eval(cp + " = clazz;");
    if(dtype) {
      clazz.prototype.dtype = dtype;
      _dtypes[dtype] = clazz
    }return clazz
  };
  D.object = function(options, defaultType) {
    if(options instanceof Dino.BaseObject) {
      return options
    }var dtype = options.dtype || defaultType;
    var ctor = _dtypes[dtype];
    if(!ctor) {
      Dino.error_log('Class for dtype "' + dtype + '" not found');
      return null
    }return new ctor(options)
  };
  D.widget = D.object;
  D.isFunction = $.isFunction;
  D.isArray = $.isArray;
  D.isObject = $.isPlainObject;
  D.isString = function(obj) {
    return typeof obj == "string"
  };
  D.isBoolean = function(obj) {
    return typeof obj == "boolean"
  };
  D.isNumber = function(obj) {
    return typeof obj == "number"
  };
  D.each = function(src, callback) {
    if(Dino.isArray(src)) {
      var arr = src;
      for(var i = 0;i < arr.length;i++) {
        callback.call(arr, arr[i], i)
      }
    }else {
      var obj = src;
      for(var i in obj) {
        callback.call(obj, obj[i], i)
      }
    }
  };
  D.filter = function(src, fn) {
    return D.isArray(src) ? _filter_arr(src, fn) : _filter_obj(src, fn)
  };
  D._filter_obj = function(obj, fn) {
    var result = {};
    for(var i in obj) {
      if(fn.call(obj, i, obj[i])) {
        result[i] = obj[i]
      }
    }return a
  };
  D._filter_arr = function(arr, fn) {
    var result = [];
    for(var i = 0;i < arr.length;i++) {
      if(fn.call(arr, i, arr[i])) {
        result.push(arr[i])
      }
    }return result
  };
  D.map = function(obj, fn) {
    var a = D.isArray(obj) ? [] : {};
    for(var i in obj) {
      a[i] = fn.call(obj, obj[i], i)
    }return a
  };
  D.find = function(obj, fn) {
    if(!D.isFunction(fn)) {
      var x = fn;
      fn = function(it) {
        return it == x
      }
    }for(var i in obj) {
      if(fn.call(obj, obj[i])) {
        return i
      }
    }return-1
  };
  D.pretty_print = function(obj, indent) {
    if(obj == undefined) {
      return undefined
    }indent = indent || 0;
    var tabs = "";
    for(var i = 0;i < indent;i++) {
      tabs += "\t"
    }if(obj.pretty_print) {
      return obj.pretty_print(indent)
    }if(Dino.isString(obj)) {
      return'"' + obj.replace(/\n/g, "\\n") + '"'
    }else {
      if(Dino.isNumber(obj) || Dino.isBoolean(obj)) {
        return obj
      }else {
        if(D.isArray(obj)) {
          var items = [];
          D.each(obj, function(item) {
            items.push(D.pretty_print(item, indent))
          });
          return"[" + items.join(", ") + "]"
        }else {
          if(D.isFunction(obj)) {
            return"function()"
          }else {
            if(D.isObject(obj) || !indent) {
              var items = [];
              D.each(obj, function(item, key) {
                items.push(tabs + "\t" + key + ":" + D.pretty_print(item, indent + 1))
              });
              return"{\n" + items.join(",\n") + "\n" + tabs + "}"
            }else {
              return obj
            }
          }
        }
      }
    }
  };
  D.timestamp = function() {
    return(new Date).getTime()
  };
  Function.prototype.curry = function(arg) {
    var F = this;
    return function() {
      var args = [];
      for(var i = 0;i < arguments.length;i++) {
        args.push(arguments[i])
      }args.push(arg);
      return F.apply(this, args)
    }
  };
  D.BaseObject = function() {
    this._initialize.apply(this, arguments)
  };
  D.BaseObject.prototype._initialize = function() {
  };
  D.log = function(msg) {
    if(console) {
      console.error(msg)
    }
  };
  return D
}();Dino.declare("Dino.events.Event", Dino.BaseObject, {_initialize:function(overrides, baseEvent) {
  Dino.events.Event.superclass._initialize.call(this);
  if(overrides) {
    Dino.override(this, overrides)
  }this.baseEvent = baseEvent
}});
Dino.declare("Dino.events.EventDispatcher", Dino.BaseObject, {_initialize:function() {
  Dino.events.EventDispatcher.superclass._initialize.apply(this, arguments);
  this.handlers = {}
}, addEvent:function(type, callback, target) {
  var a = this.handlers[type] || [];
  a.push({callback:callback, target:target});
  this.handlers[type] = a
}, removeEvent:function(type, callback, target) {
  if(arguments.length == 1) {
    if(Dino.isString(type)) {
      this.handlers[type] = []
    }else {
      if(Dino.isFunction(type)) {
        callback = type;
        for(var i in this.handlers) {
          this.handlers[i] = Dino.filter(this.handlers[i], function(item) {
            return item.callback != callback
          })
        }
      }
    }
  }else {
    if(target) {
      this.handlers[type] = Dino.filter(this.handlers[type], function(item) {
        return item.callback != callback
      })
    }else {
      this.handlers[type] = Dino.filter(this.handlers[type], function(item) {
        return item.callback != callback || item.target != target
      })
    }
  }
}, fireEvent:function(type, event) {
  var type_a = type.split(".");
  var self = this;
  Dino.each(type_a, function(t) {
    var handler_a = self.handlers[t];
    if(handler_a === undefined) {
      return
    }Dino.each(handler_a, function(h) {
      h.callback.call(h.target || self, event)
    })
  })
}});Dino.declare("Dino.Widget", Dino.events.EventDispatcher, {_initialize:function(options) {
  Dino.Widget.superclass._initialize.apply(this, arguments);
  var o = this.opts = {};
  Dino.override(this.opts, this.defaultOptions || {});
  Dino.override(this.opts, options || {});
  this.el = "wrapEl" in o ? o.wrapEl : $(this.render_html());
  if(this.defaultCls) {
    this.el.addClass(this.defaultCls)
  }this.children = [];
  this.initialize(o);
  this.options(o);
  this.render(o.renderTo)
}, initialize:function(o) {
}, destroy:function() {
  if(this.el) {
    this.el.remove()
  }
}, render_html:function() {
  return""
}, render:function(target) {
  if(target) {
    var parentEl = target instanceof Dino.Widget ? target.el : $(target);
    parentEl.append(this.el)
  }
}, options:function(o) {
  var self = this;
  var el = this.el;
  if("width" in o) {
    el.width(o.width)
  }if("height" in o) {
    el.height(o.height)
  }if("x" in o) {
    el.css("left", o.x)
  }if("y" in o) {
    el.css("top", o.y)
  }if("tooltip" in o) {
    el.attr("title", o.tooltip)
  }if("id" in o) {
    el.attr("id", this.id = o.id)
  }if("tag" in o) {
    this.tag = o.tag
  }if("style" in o) {
    el.css(o.style)
  }if("cls" in o) {
    el.addClass(o.cls)
  }if("opacity" in o) {
    if($.support.opacity) {
      el.css("opacity", o.opacity)
    }else {
      el.css("filter", "Alpha(opacity:" + o.opacity / 100 + ")")
    }
  }if("events" in o) {
    for(var i in o.events) {
      var callback = o.events[i];
      el.bind(i, callback.curry(self))
    }
  }var regexp = /^on\S/;
  for(var i in o) {
    if(regexp.test(i)) {
      this.addEvent(i, o[i].curry(self))
    }
  }
}, link:function(obj) {
  this.link = obj;
  this.fireEvent("onLink", new Dino.events.Event({target:obj}))
}, unlink:function() {
  this.fireEvent("onUnlink", new Dino.events.Event({target:this.link}));
  this.link = null
}, addChild:function(item) {
  this.children.push(item);
  item.parent = this;
  return item
}, removeChild:function(item) {
  var i = Dino.find(this.children, item);
  if(i != -1) {
    delete this.children[i].parent;
    this.children.splice(i, 1)
  }return i != -1
}, removeAllChildren:function(o) {
  for(var i in this.children) {
    delete this.children[i].parent
  }this.children.splice(0, this.children.length)
}, eachChild:function(callback) {
  for(var i = 0;i < this.children.length;i++) {
    callback.call(this, this.children[i], i)
  }
}, getValue:function() {
  return null
}, setValue:function(val) {
}});Dino.declare("Dino.Layout", Dino.BaseObject, {insert:function(item) {
}, remove:function(item) {
}, update:function() {
}, clear:function() {
}});Dino.declare("Dino.Container", Dino.Widget, {defaultOptions:{itemFactory:function(opts) {
  return Dino.object(opts)
}, layout:"plain-layout"}, initialize:function(o) {
  Dino.Container.superclass.initialize.call(this, o);
  this.layout = Dino.object({}, "plain-layout");
  this.layout.container = this
}, options:function(o) {
  Dino.Container.superclass.options.call(this, o);
  if("itemFactory" in o) {
    this.itemFactory = o.itemFactory
  }if("layout" in o) {
    var layoutOpts = o.layout;
    if(Dino.isString(layoutOpts)) {
      layoutOpts = {dtype:layoutOpts}
    }this.layout = Dino.object(layoutOpts);
    this.layout.container = this
  }if("items" in o) {
    for(var i = 0;i < o.items.length;i++) {
      var item = this.itemFactory(o.items[i]);
      this.addItem(item)
    }
  }
}, addItem:function(item) {
  this.addChild(item);
  this.layout.insert(item);
  return item
}, removeItem:function(item) {
  this.removeChild(item);
  this.layout.remove(item)
}, removeAllItems:function() {
  this.removeAllChildren();
  this.layout.clear()
}, eachItem:function(callback) {
  this.eachChild(callback)
}});Dino.declare("Dino.layouts.PlainLayout", Dino.Layout, {insert:function(item) {
  this.container.el.append(item.el)
}, remove:function(item) {
  item.el.remove()
}, clear:function() {
  this.container.el.empty()
}}, "plain-layout");Dino.declare("Dino.containers.Box", Dino.Container, {render_html:function() {
  return"<div></div>"
}}, "box");Dino.declare("Dino.widgets.form.InputField", Dino.Widget, {options:function(o) {
  Dino.widgets.form.InputField.superclass.options.call(this, o);
  if("text" in o) {
    this.el.val(o.text)
  }if("readonly" in o) {
    this.el.attr("readonly", o.readonly)
  }if("name" in o) {
    this.el.attr("name", o.name)
  }
}, initialize:function(o) {
  var self = this;
  this.el.change(function() {
    self.setValue(self.el.val())
  })
}});
Dino.declare("Dino.widgets.form.TextField", Dino.widgets.form.InputField, {render_html:function() {
  return'<input type="text" class="dc-form-textfield"></input>'
}}, "textfield");
Dino.declare("Dino.widgets.form.Button", Dino.widgets.form.InputField, {render_html:function() {
  return'<input type="button" class="dc-form-button"></input>'
}, options:function(o) {
  Dino.widgets.form.Button.superclass.options.call(this, o);
  var self = this;
  this.el.click(function(e) {
    self.fireEvent("onAction", Dino.events.Event({}, e))
  })
}}, "button");
Dino.declare("Dino.widgets.form.File", Dino.widgets.form.InputField, {render_html:function() {
  return'<input type="file" class="dc-form-file"></input>'
}, build:function(o) {
  Dino.widgets.form.File.superclass.build.call(this, o);
  var name = this.el.attr("name");
  if(!name) {
    this.el.attr("name", "file-input")
  }
}}, "file");
Dino.declare("Dino.widgets.form.Radio", Dino.widgets.form.InputField, {render_html:function() {
  return'<input type="radio" class="dc-form-radio"></input>'
}}, "radio");
Dino.declare("Dino.widgets.form.Checkbox", Dino.widgets.form.InputField, {render_html:function() {
  return'<input type="checkbox" class="dc-form-checkbox"></input>'
}}, "checkbox");
Dino.declare("Dino.widgets.form.TextArea", Dino.widgets.form.TextField, {render_html:function() {
  return'<textarea class="dc-form-textarea"></textarea>'
}}, "textarea");
Dino.declare("Dino.widgets.form.Label", Dino.Widget, {render_html:function() {
  return'<label class="dc-form-label"></label>'
}, options:function(o) {
  Dino.widgets.form.Label.superclass.options.call(this, o);
  if("text" in o) {
    this.el.text(o.text)
  }if("forName" in o) {
    this.el.attr("for", o.forName)
  }
}}, "label");Dino.declare("Dino.widgets.Image", Dino.Widget, {render_html:function() {
  return"<img></img>"
}, options:function(o) {
  Dino.widgets.Image.superclass.options.call(this, o);
  if("imageUrl" in o) {
    this.el.attr("src", o.imageUrl)
  }
}}, "image");
Dino.declare("Dino.utils.AsyncImage", Dino.Widget, {render_html:function() {
  return"<img></img>"
}, initialize:function(o) {
  Dino.utils.AsyncImage.superclass.initialize.call(this, o);
  this.load(o.imageUrl, o.renderTo, o.stub, o.maxWidth, o.maxHeight)
}, load:function(url, target, stubObj, maxWidth, maxHeight) {
  if(target && url) {
    if(stubObj) {
      stubObj.render(target)
    }var storeEl = $("#image-loader-store");
    if(storeEl.length == 0) {
      storeEl = $('<div id="image-loader-store" style="width:0;height:0"></div>');
      $("body").append(storeEl)
    }var el = this.el;
    var self = this;
    el.css({width:"", height:"", display:"none"});
    storeEl.append(el);
    el.one("load", function() {
      var w = maxWidth;
      var h = maxHeight || maxWidth;
      if(maxWidth) {
        w = Math.min(w, el.width());
        h = Math.min(h, el.height())
      }else {
        w = el.width();
        h = el.height()
      }var sx = w / el.width();
      var sy = h / el.height();
      if(sx < sy) {
        el.width(w)
      }else {
        el.height(h)
      }el.css({display:""});
      if(stubObj) {
        stubObj.el.replaceWith(el)
      }self.fireEvent("onComplete", {})
    });
    el.attr("src", url)
  }
}}, "async-image");Dino.declare("Dino.widgets.CssButton", Dino.Widget, {defaultCls:"dc-css-button", render_html:function() {
  return"<div></div>"
}, options:function(o) {
  Dino.widgets.CssButton.superclass.options.call(this, o);
  var self = this;
  if("toggleCls" in o) {
    this.toggleCls = o.toggleCls;
    this.el.click(function(e) {
      var event = new Dino.events.Event({is_canceled:false, cancel:function() {
        this.is_canceled = true
      }}, e);
      self.fireEvent("onToggle", event);
      if(!event.is_canceled) {
        self.el.toggleClass(o.toggleCls)
      }
    })
  }
}, isToggled:function() {
  return this.el.hasClass(this.toggleCls)
}, toggle:function(val) {
  this.el.toggleClass(this.toggleCls, val)
}}, "css-button");Dino.declare("Dino.widgets.AssistBox", Dino.containers.Box, {defaultCls:"dc-assist-box", staticWidth:function() {
  return 16
}}, "widgets::assist-box");
Dino.declare("Dino.widgets.AdvancedInput", Dino.containers.Box, {defaultCls:"dc-advanced-input", options:function(o) {
  Dino.widgets.AdvancedInput.superclass.options.call(this, o)
}, initialize:function(o) {
  Dino.widgets.AdvancedInput.superclass.initialize.call(this, o);
  this.assistBox = Dino.object({dtype:"widgets::assist-box", style:{"float":"right"}, width:16});
  this.input = Dino.object({dtype:o.multiline ? "textarea" : "textfield", style:{width:"100%", border:"none"}});
  var assistSize = this.assistBox.staticWidth() + 2;
  o.items = [{dtype:"box", style:{width:"100%", "float":"left", "margin-right":"-" + assistSize + "px"}, items:[{dtype:"box", style:{"margin-right":assistSize + "px"}, items:[this.input]}]}, this.assistBox, {dtype:"box", style:{clear:"both"}}]
}}, "dino-advanced-input");
Dino.declare("Dino.widgets.FileAssist", Dino.widgets.CssButton, {defaultCls:"dc-assist-file", initialize:function(o) {
  Dino.widgets.FileAssist.superclass.initialize.call(this, o);
  var self = this;
  var fileId = "file_" + Dino.timestamp();
  this.file = Dino.widget({dtype:"file", style:{position:"relative", cursor:"pointer"}, opacity:0, id:fileId, name:o.name, width:o.width, height:o.height});
  this.file.el.attr("size", 1);
  this.file.el.change(function(e) {
    $.ajaxFileUpload({url:self.url, fileElementId:fileId, dataType:"text", success:function(data, status) {
      self.fireEvent("onComplete", {data:data})
    }, error:function(data, status, err) {
      self.fireEvent("onError", {data:data, message:err})
    }});
    self.fireEvent("onLoad", {})
  });
  this.el.append(this.file.el)
}, options:function(o) {
  Dino.widgets.FileAssist.superclass.options.call(this, o);
  if("url" in o) {
    this.url = o.url
  }
}}, "file-assist");

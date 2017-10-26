 + function($) {

     var MainFunc = function(elemtn, option) {
         this.element = elemtn[0];
         this.version = "0.1";
         this.options = option;
     }
     MainFunc.Defaults = {
         target: window,
         keyboard: true,
         _greet: true,
         color: 'green'
     }

     MainFunc.prototype.colorify = function() {
         $(this.element).css('background', this.options.color);
     }
     MainFunc.prototype.greet = function() {
         var msg = this.getMsg();
         alert(msg);
     };
     MainFunc.prototype.getMsg = function() {
         var elem = this.element;
         var msg = this.options.msg;
         return msg;
     };

     $.fn.Test = function(options) {
         return this.each(function() {
             var ths = $(this);
             var data = ths.data('AV.test');
             var option = $.extend({}, MainFunc.Defaults, ths.data(), typeof options == 'object' && options);

             if (!data) ths.data('AV.test', (data = new MainFunc(ths, option)))             
             if (typeof options == 'string') data[options]()
             else if (option._greet) data.greet();
         })
     };


     $.fn.Test.Constructor = MainFunc;

     $(document).on('click.av.test.data-api', '[data-toggle="greet"]', function() {
         var options = $(this).data('AV.test') ? 'greet' : $.extend({}, MainFunc.Defaults, $(this).data());
         $(this).Test(options);
     });

 }(window.jQuery);
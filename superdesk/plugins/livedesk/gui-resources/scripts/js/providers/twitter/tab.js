define('providers/twitter/tab', ['providers'], function(providers) {	providers.twitter = {		className: 'big-icon-twitter',	                tooltip: _('Twitter'),		init: function() {							require(['providers','providers/twitter'], function(providers) {				providers.twitter.init();			});		},				// aop on timeline view		timeline: 		{		    preData: function()		    {		        // TODO add meta to another member which can be fed...		        // need to change Meta to object to use in template		        try{		            this.model.data.Meta = JSON.parse(this.model.get('Meta'));		        }		        catch(e){}		        var a = this.model.data.Meta.annotation;		        this.model.data.Meta.annotation = {before: a[0], after: a[1]};		    },		    init: function()		    {		        var self = this;		        // TODO move to set for cleanness		        $(this.el).on('click', '.btn.publish', function()		        {		            var data = {Content: self.model.get('Content'), Meta: self.model.get('Meta')};		            //data.Content = $('.twitter-full-content .result-text', self.el).html();	                data.Meta.annotation = [$('.twitter-full-content .annotation:eq(0)', self.el).html(), 	                    $('.twitter-full-content .annotation:eq(1)', self.el).html()];	                data.Meta = JSON.stringify(data.Meta);	                self.model.set(data).sync();	                self.el.find('.actions').addClass('hide');		        });		        $(this.el).on('click', '.btn.cancel', function()                {		            self.el.find('actions').hide()                });		    },		    edit: function()		    {		        this.el.find('.actions').removeClass('hide');		    },		    save: function()		    {		        return false;		    }		}	};	return providers;});
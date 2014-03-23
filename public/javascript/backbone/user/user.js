/**
 * Created with JetBrains WebStorm.
 * User: NBE01
 * Date: 14-3-23
 * Time: 上午11:09
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(init);

function init(){
    /**
     * user模型
     * @type {*}
     */
    User = Backbone.Model.extend({
        defaults:{
            name:'',
            age:0,
            sex:1
        },
        url:'user',
        validate : function(attrs,options){
            if(!attrs.name){
                return "名字不能唯空";
            }
            if(!/^\d+$/.test(attrs.age)){
                console.log(attrs.age);
                return "年龄必须是数字类型";
            }
        }
    });
    /**
     * user-list模型
     */
    UserList = Backbone.Collection.extend({
        model:User
    });
    userList = new UserList();
    /**
     * 视图添加修改的UserView
     */
    UserView = Backbone.View.extend({
        initialize : function(){
            this.listenTo(this.model,"change",this.render);
        },
        template : _.template($("#user-template").html()),
        className:'modal-dialog',
        events:{
            'click .submit':'addToList'
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        addToList : function(){
            //多个属性的变更，最好用如下的方式  单个属性一个一个set 就第一个好使 不知道为什么
            this.model.set({
                name : this.$el.find('input[name="name"]').val(),
                age : this.$el.find('input[name="age"]').val(),
                sex : this.$el.find('input[name="sex"]:checked').val()
            });
            //this.module.save();
            userList.add(this.model);
            $('#user').modal('hide');
        }
    });
    /**
     * 视图列表UserItemView
     */
    UserItemView = Backbone.View.extend({
        tagName:"tr",
        template : _.template($("#user-list-template").html()),
        initialize: function(){
            //检测当前对象如果发生change就会重新渲染
            this.listenTo(this.model,'change',this.render);
            //检测当前对象如果销毁，同时删除视图
            this.listenTo(this.model,'destroy',this.remove);
        },
        events:{
            'click .update' : 'updateItem',
            'click .del' : 'delItem'
        },
        updateItem : function(){
            console.log(this.model.toJSON());
            var userView = new UserView({model:this.model});
            $('#user').html(userView.render().$el);
            $('#user').modal('show');
        },
        delItem : function(){
            this.model.destroy();
        },
        render : function(){
            console.log(this.model);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    /**
     * 总视图 appView
     */

    AppView = Backbone.View.extend({
        el:$('.view'),
        initialize:function(){
            this.listenTo(this.collection,'add',this.addOne);
            this.listenTo(this.collection,'reset',this.addAll);
        },
        'events':{
            'click .add-user':'newUser'
        },
        addOne : function(model){
            var itemView = new UserItemView({model:model});
            itemView.render().$el.appendTo($('.view-item'));
        },
        addAll : function(){
            this.collection.each(this.addOne,this);
        },
        newUser : function(){
            var user = new User();
            var userView = new UserView({
                model:user
            });
            $('#user').html(userView.render().$el);
        }
    });


    new AppView({
        collection:userList
    });

}

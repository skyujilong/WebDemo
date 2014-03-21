/**
 * Created with JetBrains WebStorm.
 * User: yujilong
 * Date: 14-3-20
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    //注意，这里中的router模拟的是页面跳转的行为，如果未发生跳转行为，将不会渲染页面！！好操蛋啊
    /**
     * 定义数据类型
     * @type {*}
     */
    var User = Backbone.Model.extend({
        //初始化数据
        defaults: {
            name: '',
            age: '',
            sex: 2
        },
        url: 'user',
        //数据验证
        validate: function (attrs, options) {
            if (attrs.name.length === 0) {
                return "请填写名字!";
            }

            if (!/^\d+$/.test(attrs.age)) {
                return "必须是数字类型!";
            }
        },
        toJSON: function () {
            var json = Backbone.Model.prototype.toJSON.call(this, arguments);
            json.cid = this.cid;
            return json;
        }

    });
    /**
     * USER的list模型
     * @type {*}
     */
    var UserCollection = Backbone.Collection.extend({
        module: User
    });
    var userCollection = new UserCollection([new User({name: '张三', age: 20, sex: 2})]);
    userCollection.add(new User({name: '李四', age: 25, sex: 1}));
    /**
     * 对应user的视图映射
     * @type {*}
     */
    var UserView = Backbone.View.extend({
        initialize: function (obj) {
            this.module = new User();
            this.collection = obj.collection;
        },
        template: _.template($('#user').html()),
//        el:document.getElementsByClassName('add')[0],
        render: function () {
            this.$el.html(this.template(this.module.toJSON()));
            return this;
        },
        events: {
            'click input[class="modify"]': 'modify'
        },
        modify: function () {
            var cid = this.module.cid;
            var module = this.collection.get(cid);
            if (module) {
                module.save({
                    name: this.$el.find('input[name="name"]').val(),
                    age: this.$el.find('input[name="age"]').val(),
                    sex: this.$el.find('select').val()
                });
                this.collection.push(module);
            } else {
                this.collection.push(new User({
                    name: this.$el.find('input[name="name"]').val(),
                    age: this.$el.find('input[name="age"]').val(),
                    sex: this.$el.find('select').val()
                }));
            }
            userRouter.navigate('list', { trigger: true , replace: true});
        }

    });

    var UserListView = Backbone.View.extend({
        //指定具体的那个 dom下  也有属性是tagName
//        tagName : 'ul',
//        className : 'list',
        //可以直接指定el
//        el:document.getElementsByName('ul')[0],
        //指定模版
        template: _.template($('#user-list-template').html()),
        render: function () {
            var viewer = this;
            this.remove();
            this.collection.each(function (user) {
                viewer.$el.append(viewer.template(user.toJSON()));
            });
            return this;
        }
    });
    var userListView = new UserListView(
        {
            collection: userCollection
        });
    var userView = new UserView({
        collection: userCollection
    });
    /**
     * user的路径映射
     * @type {*}
     */
    var UserRouter = Backbone.Router.extend({
        //映射路径 对应方法
        routes: {
            "": "init",
            "list": "list",
            "save/:cid": "save"
        },
        init: function () {
            console.log('xxxxxxxxx');
            userListView.render().$el.appendTo($('.list'));
            userView.render().$el.appendTo($('.user'));
        },
        list: function () {
            userListView.render().$el.appendTo($('.list'));
        },
        save: function (cid) {
            if (cid) {

            } else {

            }
        }
    });

    var userRouter = new UserRouter('body');
    Backbone.history.start();

});

WebDemo
=======

前端练习例子(javascript)

Backbone的例子：在backbone文件下
源码思路分析：
    backbone主要有五大对象，EVENT、MODEL、COLLECTION、VIEW、ROUTER，这五个对象！
    其中，这些对象都有一个巧妙的继承关系，主要是model、collection、view均都继承了event对象，
    可以说event对象就是backbone的核心，通过一系列的方法与手段完成了数据变更与视图变更的解耦合操作，非常的精巧！

    解耦思路：
        event对象中，实际上给当前的对象封装了一组事件对象，模型应该类似于这样:
        _event={
            '事件的名称如：add' : [],
            ...
        }
        _event数组中封装的数组对象，每个实例都大致是这样的：要执行的函数，执行函数的参数以及函数执行的上下文环境。

    例子：
        假如说，当你想backbone.collection中添加一个对象的时候，你会调用函数的add方法，该方法中会默认的去_event对象中
    查找add对象的数组，如果数组能找到，则依次执行数组中的函数。同时他回去触发all方法，如果能找到的话。
        这样，当你在代码中，有个一函数是监听这个实例的这个add方法的时候，自然就会被执行你所希望执行的方法。


    注：
        在backbone中运用了大量的对象复制操作，应该是为了代码的安全性。。。
        另，运用了大量的第三参数是option的参数，这样一个函数的逻辑非常内聚，逻辑也变的复杂。
        注，event这个对象执行的，都是自己当前对象的实例，并不会去影响其他的实例！实质上就是一个循环。
        个人认为backbone把数组玩的出神入化了。。。。
        感觉整体event的实现方式有点像生产者消费者的那套东西。。。。不过代码都是同步代码。。。。。

    本人理解的backbone最佳实践：
        主页面的大框架有一个view，list列表中的也是一个单独的view，像是单独的弹出框，比如说是增加或者修改，个人认为可以单例一个view，不过
        对应的model需要是新的！整体思路就是尽量细化，之后内部变化通过listenTo去监听，然后实现页面上的渲染。数据操作和页面操作尽量分离。

                                                                                                2014年3月27日 10:56:24



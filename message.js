!function () {
  var model = {
    
    // 获取数据
    init: function () {
      var APP_ID = 'SfyfViCjI0O68EKxQQrNQNNd-gzGzoHsz';
      var APP_KEY = 'wadcDIGyyUoFCXf86AQyMtGI';
      AV.init({appId: APP_ID, appKey: APP_KEY})   // 确定与 官网哪个应用 关联
    },
    fetch: function () {
      var query = new AV.Query('Message');  // 查询并获得 我的这个应用里面的 Message目录
      return query.find() // Promise 对象  query.find() 和 获取数据有关
    },
    
    
    // 创建数据 ，将传入的两个 字符串  存到目录里面，
    save: function (name, content) {
      var Message = AV.Object.extend('Message');  // 若有Message目录，将数据存入；没有，先创建
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content
      })
    }
    
    
  }
  
  
  var view = document.querySelector('section.message')
  
  
  var controller = {
    view: null,
    model: null,
    messageList: null,
    
    init: function (view, model) {
      this.view = view
      this.model = model
      
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    
    loadMessages: function () {
      // 获得数据 后 ，then方法的 第一个参数是函数，函数的第一个参数就是数据
      this.model.fetch().then(
        (messages) => {
          // console.log(messages);
          // ------------------------------------------------
          let array = messages.filter((item) => {
            return (item.attributes.name !== undefined && item.attributes.content !== undefined)
          })
          
          array = array.map((item) => {
            return item.attributes
          })
          // ---------------------------------------------------
          // 上面两道筛选， 选出有name 和 content 属性的对象
          console.log(array);
          
          array.forEach((item) => {
            let head = document.createElement('div')
            let body = document.createElement('div')
            let message = document.createElement('div')
  
            head.classList.add("head")
            body.classList.add("body")
            message.classList.add("everyMessage")
  
  
            head.innerText = `${item.name}: `
            message.appendChild(head)
            body.innerText = `${item.content}`
            message.appendChild(body)
            
            this.messageList.appendChild(message)
          })
        }
      )
    },
    
    bindEvents: function () {
      var that = this
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        that.saveMessage()
      })
    },
    
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('textarea[name=textArea]').value
      let name = myForm.querySelector('input[name=name]').value
      
      this.model.save(name, content).then(function (object) {
  
        let head = document.createElement('div')
        let body = document.createElement('div')
        let message = document.createElement('div')
  
        head.classList.add("head")
        body.classList.add("body")
        message.classList.add("everyMessage")
        
        head.innerText = `${object.attributes.name}: `
        message.appendChild(head)
        body.innerText = `${object.attributes.content}`
        message.appendChild(body)
        
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(message)
        
        
        myForm.querySelector('textarea[name=textArea]').value = ''
        console.log(object)
      })
      
      
    }
    
  }
  
  controller.init(view, model)
  
  
}.call()
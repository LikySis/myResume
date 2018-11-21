var APP_ID = 'SfyfViCjI0O68EKxQQrNQNNd-gzGzoHsz';
var APP_KEY = 'wadcDIGyyUoFCXf86AQyMtGI';


AV.init({appId: APP_ID, appKey: APP_KEY})


var query = new AV.Query('Message');  // 获得 我的这个应用里面的 Message目录
console.log(query);
console.log(query.find());


var Form = document.querySelector('#postMessageForm')

// console.log(Form);

Form.addEventListener('submit', function (e) {
  
  console.log(e);
  e.preventDefault();
  
  var content = Form.querySelector('textarea[name=textArea]').value
  
  var Message = AV.Object.extend('Message')
  //在应用里面创建 一个 Message目录
  
  var data = new Message()
  // 在目录里创建一条数据
  
  // 设置这条数据的内容
  data.save({
    words: content
    
  }).then(function (object) {
    // alert('LeanCloud Rocks!');
    console.log('save success!');
  })
  
  
})


//     fetch: function(){
//       var query = new AV.Query('Message');
//       return query.find() // Promise 对象
//     },
//     // 创建数据
//     save: function(name, content){
//       var Message = AV.Object.extend('Message');
//       var message = new Message();
//       return message.save({  // Promise 对象
//         'name': name,
//         'content': content
//       })
//     }
//   }
//
//
//   var view = document.querySelector('section.message')
//
//
//   var controller = {
//     view: null,
//     model: null,
//     messageList: null,
//     init: function(view, model){
//       this.view = view
//       this.model = model
//
//       this.messageList = view.querySelector('#messageList')
//       this.form = view.querySelector('form')
//       this.model.init()
//       this.loadMessages()
//       this.bindEvents()
//     },
//     loadMessages: function(){
//       this.model.fetch().then(
//         (messages) => {
//           let array = messages.map((item)=> item.attributes )
//           array.forEach((item)=>{
//             let li = document.createElement('li')
//             li.innerText = `${item.name}: ${item.content}`
//             this.messageList.appendChild(li)
//           })
//         }
//       )
//     },
//     bindEvents: function(){
//       this.form.addEventListener('submit', function(e){
//         e.preventDefault()
//         this.saveMessage()
//       })
//     },
//     saveMessage: function(){
//       let myForm = this.form
//       let content = myForm.querySelector('textarea[name=textArea]').value
//       let name = myForm.querySelector('input[name=name]').value
//       this.model.save(name, content).then(function(object) {
//         let li = document.createElement('li')
//         li.innerText = `${object.attributes.name}: ${object.attributes.content}`
//         let messageList = document.querySelector('#messageList')
//         messageList.appendChild(li)
//         myForm.querySelector('textarea[name=textArea]').value = ''
//         console.log(object)
//       })
//     }
//
//   }
//
//   controller.init(view, model)
//
//
// }.call()
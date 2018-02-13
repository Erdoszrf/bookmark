var hashA = init()
var keyboard = hashA['keyboard']
var hash = hashA['hash']
var isedit = false
createboard(keyboard, hash)
listenToUser(hash)
search()
msgbox()
function msgbox(){
  var msgboxtip = getFromLocalStorage('msg')
  if(!msgboxtip){
    localStorage.setItem('msg', '1')
    $(document).ready(function(){
      layer.open({
        type: 1,
        title:'使用帮助',
        skin: 'layui-layer-lan', //加上边框
        area: ['420px', '140px'], //宽高
        content: '欢迎使用本网站，鼠标悬浮于键盘可修改或删除书签地址，因国内网络环境，部分网站icon可能无法正常显示'
      });
    });
  }
  }

  



function init(){
  var keyboard = {
    '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
    '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
    '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
    'length': 3
  }
  var hash = {'q': 'qq.com', 'w': 'weibo.com', 'e': 'ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': undefined, 'a': 'acfun.tv', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'
  }
  // 取出 localStorage 中的 zzz 对应的 hash
  var hashInLocalStorage = getFromLocalStorage('site') 
  if(hashInLocalStorage){
    hash = hashInLocalStorage
  }
  return{keyboard,hash}
}
function createboard(keyboard,hash){
  for(let i = 0;i<keyboard.length;i++){
    let div = document.createElement('div')
    div.className = 'row'
    main.appendChild(div)
    let row = keyboard[i]
    for(let j = 0;j<keyboard[i]['length'];j++){
      //console.log(keyboard[i][j])
      let kbd = document.createElement('kbd')
      kbd.className = 'key'
      kbd.textContent = keyboard[i][j]
      let icondiv = document.createElement('div')
      icondiv.className = 'icons'
      let editsite = document.createElement('span')
      editsite.className = 'editsite'
      let deletesite = document.createElement('span')
      deletesite.className = 'deletesite'
      editsite.innerHTML = "<svg class='icon'> <use xlink:href='#icon-edit'> </use> </svg>"
      deletesite.innerHTML = "<svg class='icon'> <use xlink:href='#icon-delete'> </use> </svg>"
      icondiv.appendChild(editsite)
      icondiv.appendChild(deletesite)
      let img = createImage(hash[row[j]])
      img.className = 'siteicon'
      kbd.appendChild(icondiv)
      kbd.appendChild(img)
      div.appendChild(kbd)
    }
  }
  var hashInLocalStorage = getFromLocalStorage('site') 
      if(hashInLocalStorage){
        hash = hashInLocalStorage
      }
    }
  

function getFromLocalStorage(name){
  return JSON.parse(localStorage.getItem(name) || 'null')
}
var clock
$('kbd').on('mouseenter',function(e){
  e.currentTarget.children[0].style.display = "block"
})
$('kbd').on('mouseleave',function(e){
  e.currentTarget.children[0].style.display = "none"
})
$('.editsite').on('click',function(e){
  e.stopPropagation();
  isedit = true
  layer.prompt({title:'输入您要的网址'},function(value, index, elem){
    let id = ($(e.currentTarget).parent().parent().text()).replace(/\s+/g,"")
    hash[id]=value
    localStorage.setItem('site', JSON.stringify(hash))
    $(e.currentTarget).parent().siblings().attr("src", "https://"+value + "/favicon.ico" ).error(function(){$(e.currentTarget).parent().siblings().hide()})
    layer.close(index)
    isedit = false
  });  
})
$('.deletesite').on('click',function(e){
  e.stopPropagation();
  let id = ($(e.currentTarget).parent().parent().text()).replace(/\s+/g,"")
  if(hash[id] === ''){layer.alert('加上网址才可以删除呦~'); }
  hash[id]=''
  localStorage.setItem('site', JSON.stringify(hash))
  $(e.currentTarget).parent().siblings().attr("src", "" ).error(function(){$(this).hide()})
})
function createImage(domain){
  var img = document.createElement('img')
  if(domain){
    img.src = 'http://'+ domain + '/favicon.ico'
    img.onerror = function(){
      $(this).hide()
    }
  }
  return img
}
function listenToUser(hash){
  document.onkeypress = function(x){
      var key = x['key'] // q w e
      var website = hash[key]
      if(website && isedit === false){
        window.open('http://'+website, '_blank')
      }
      
    }
  $('kbd').on('click',function(e){
    let id = ($(e.currentTarget).text()).replace(/\s+/g,"")
    let website = hash[id]
    if(website && isedit === false){
      window.open('http://'+website, '_blank')
    }
  })
}
function search(){
  $('.baidu').on('click',function(){
    let val = $(this).siblings().eq(0).val()
    window.open("https://www.baidu.com/s?wd=" +val )
  })
  $('.google').on('click',function(){
    let val = $(this).siblings().eq(0).val()
    window.open("https://www.google.com/search?q=" + val)
  })
}

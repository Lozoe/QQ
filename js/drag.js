function getByClass(clsName,parent)
{
	var oParent=parent?document.getElementById(parent):document,
		eles=[];
		elements=oParent.getElementsByTagName('*');
	//alert(oParent.innerHTML);
	for(var i=0;i<elements.length;i++)
	{
		if(elements[i].className==clsName)
		{
			eles.push(elements[i]);
		}
	}
	return eles;
}
window.onload=drag;
function drag()
{
	oTitle=getByClass('login_logo_webqq','loginPanel')[0];
	// alert(oTitle.nodeName);
	// 拖曳
	oTitle.onmousedown=move;
	//关闭
	var close=document.getElementById("ui_boxyClose");
	close.onclick=function()
	{
		document.getElementById("loginPanel").style.display="none";
	};
	//切换状态
	var loginState=document.getElementById('loginState');
	var loginStateShow=document.getElementById('loginStateShow');
	var loginStateTxt=document.getElementById('login2qq_state_txt');
	var uls=document.getElementById('loginStatePanel');
	var lists=uls.getElementsByTagName('li');
	loginState.onclick=function(event)
	{
		event=event||window.event;
		if(event.stopPropagation)
		{
			event.stopPropagation();
		}
		else
		{
			event.cancelBubble=true;
		}
		uls.style.display='block';	
	};	
	// 鼠标滑过、离开和点击状态列表时,为其绑定事件处理程序
	for(var i=0,len=lists.length;i<len;i++)
	{
		lists[i].onmouseover=function()
		{
			this.style.background='#567';
		};
		lists[i].onmouseout=function()
		{
			this.style.background='#fff';
		};
		lists[i].onclick=function(event)
		{
			event=event||window.event;
			if(event.stopPropagation)
			{
				event.stopPropagation();
			}
			else
			{
				event.cancelBubble=true;
			}
			uls.style.display='none';
			id=this.id;
			loginStateShow.className='';
			loginStateShow.className='login-state-show '+id;
			loginStateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
		};
	}
	//当鼠标点击文档任意位置的时候，隐藏状态列表
	document.onclick=function(){
		  	uls.style.display='none';
	};
}

function move(event)
{
	event=event||window.event;//获取鼠标按下时的event对象
	var oDrag=document.getElementById("loginPanel");//获取整个面板
	//光标按下时光标和面板之间的距离
	var x=event.clientX-oDrag.offsetLeft;
	var	y=event.clientY-oDrag.offsetTop;
	 //alert("x="+x+",y="+y);
	//获取窗口的宽度与高度
	var windowW=document.documentElement.clientWidth||document.body.clientWidth;
	var windowH=document.documentElement.clientHeight||document.body.clientHeight;
	//求出最大的水平移动的宽度与竖直移动的高度
	maxW=windowW-oDrag.offsetWidth-10;
	maxH=windowH-oDrag.offsetHeight;
	//移动
	document.onmousemove=function(event){	
		// document.title=cursorX+" ,"+cursorY;
		event=event||window.event;//获取光标移动时的event对象
		// alert(event.clientX);	
		var left=event.clientX-x;	
		var top=event.clientY-y;
		//console.log("left="+left+",top="+top);		
		if(left<0)
		{
			left=0;
		}	
		else if(left>maxW)
		{
			left=maxW;
		}
		if(top<0)
		{
			top=10;
		}	
		else if(top>maxH)
		{
			top=maxH;
		}
		oDrag.style.left=left+'px';
		oDrag.style.top=top+'px';
	};	
	//释放
	document.onmouseup=function()
	{
		document.onmousemove=null;
		document.onmouseup=null;
	};	
}

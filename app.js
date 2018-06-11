var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginOutRouter = require('./routes/loginOut');
var checkLogin = require('./routes/checkLogin');
var addCart = require('./routes/addCart');
var cartList = require('./routes/cartList');
var deleteGoods = require('./routes/deleteGoods');
var edit = require('./routes/edit');
var editCheckedAll = require('./routes/editCheckedAll.js')
var deleteAll =require('./routes/deleteAll');
var getUserDetail = require('./routes/getUserDetail');
var getUserAddress = require('./routes/getUserAddress');
var setDefalutAddress = require('./routes/setDefalutAddress');
var getSelectAddress = require('./routes/getSelectAddress');
var getSelectGoods = require('./routes/getSelectGoods');
var submit = require('./routes/submit');
var getSubmitOrder = require('./routes/getSubmitOrder');
var delAlreadyGoods = require('./routes/delAlreadyGoods');
var getCounter = require('./routes/getCounter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

//全局拦截
app.use((req,res,next)=>{
	
	if(req.cookies.userID){
		next();
	}else{
		if(req.originalUrl == '/getUser'|| req.originalUrl == '/loginout'|| req.originalUrl.indexOf('/fruits') != -1 || req.originalUrl == '/checkLogin' || req.originalUrl.indexOf('/getFruitDetail') > -1 ){
			next();
		}else{
			res.json({
				status:10010,
				msg:'当前没登陆',
				result:''
			})
		}
	}
})

app.use('/', indexRouter);
app.use('/getUser', usersRouter);
app.use('/loginout',loginOutRouter);
app.use('/checkLogin',checkLogin);
app.use('/addCart',addCart);
app.use('/cartList',cartList);
app.use('/deleteGoods',deleteGoods);
app.use('/edit',edit);
app.use('/editCheckedAll',editCheckedAll);
app.use('/deleteAll',deleteAll);
app.use('/getUserDetail',getUserDetail);
app.use('/getUserAddress',getUserAddress);
app.use('/setDefalutAddress',setDefalutAddress);
app.use('/getSelectGoods',getSelectGoods);
app.use('/getSelectAddress',getSelectAddress);
app.use('/submitOrder',submit);
app.use('/getSubmitOrder',getSubmitOrder);
app.use('/delAlreadyGoods',delAlreadyGoods);
app.use('/getCounter',getCounter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //渲染一级分页功能
  // //发送ajax请求
  //  //渲染数据
  function render() {
    $.ajax({
      type :"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        $("tbody").html(template("tpl",data));

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:1,
          totalPages:Math.ceil(data.total / pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  render();
  //显示添加模态框
  $(".btn_add").on("click",function () {
    $("#addModal").modal("show");
  })

  //给表单做校验
  // //校验时使用的图标
  var $form = $("#form");
  $form.bootstrapValidator({
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      }
    }
  });
  //要发送ajax请求
  // $(".btn_confirm").on("click",function (e) {

  $form.on("success.form.bv",function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (data) {
        //  //成功了，需要做什么?
        //1. 关闭模态框
        // console.log(data);
        if (data.success) {
          $("#addModal").modal("hide");
          ////2. 重新渲染第一页
          currentPage = 1;
          render();
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();

        }
      }
    })
  })
})
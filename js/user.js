/**
 * Created by HUCC on 2017/10/29.
 */

$(function () {


  //发送ajax请求，获取后台的数据
  var currentPage = 1;
  var pageSize = 8;

  //去后台获取数据，拿的currentPage页的数据
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        var html = template("tpl", data);
        $("tbody").html(html);


        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: currentPage,
          size:"small",
          totalPages: Math.ceil(data.total/pageSize),
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            render();
          }

        });

      }
    });
  }
  render();

 $("tbody").on("click",".btn",function () {
   $("#userModal").modal("show");
   var id = $(this).parent().data("id");
   var isDelete = $(this).parent().data("isDelete");
   console.log(id);
   console.log(isDelete);
   isDelete = isDelete === 1? 0:1;

   $(".btn_confirm").off().on("click",function () {
     $.ajax({
       type:"post",
       url:"/user/updateUser",
       data:{
         id:id,
         isDelete:isDelete
       },
       success:function (data) {
         console.log(data);
         if(data.success){
           $("#userModal").modal("hide");
           render();
         }
       }
     })
   })
 })
});


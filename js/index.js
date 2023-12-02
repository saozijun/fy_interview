let pageSize = 2; //页数
let currentPage = 1; //当前页
let tempData = []; //临时数据
//获取数据
$.getJSON("./data.json").then((res) => {
  let data = res.list;
  tempData = data;
  localStorage.setItem("data",JSON.stringify(data));
  setData(data);
  initPage(data);
});
//初始化表格
function setData(temp = false) {
    let data = temp || tempData || JSON.parse(localStorage.getItem("data"));
    console.log('temp :>> ', temp);
    let dom = ` <tr>
    <th>采购编码</th>
    <th>供应商名称</th>
    <th>商品名称</th>
    <th>商品别名</th>
    <th>商品分类</th>
    <th>商品单位</th>
    <th>采购单价</th>
    <th>采购数量</th>
    <th>入库数量</th>
    <th>采购重量</th>
    <th>采购金额</th>
    <th>单据状态</th>
    <th>创建时间</th>
            </tr>`;
    //累计
    let total = {
        number: "累计",
        SupplierName: "",
        ProductName: "",
        ProductAlias: "",
        ProductCategory: "",
        ProductUnit: "",
        PurchaseUnitPrice: 0,
        PurchaseQuantity: 0,
        StockQuantity: 0,
        PurchaseWeight: 0,
        PurchaseAmount: 0,
        DocumentStatus: "",
        CreationTime: "",
    };
    let c_length = pageSize*currentPage;
    if(pageSize*currentPage> data.length){
            c_length = data.length;
    }
    for (let i = (currentPage-1)*2; i < c_length; i++) {
        //小计
        let subtotal = {
        number: "小计",
        SupplierName: "",
        ProductName: "",
        ProductAlias: "",
        ProductCategory: "",
        ProductUnit: "",
        PurchaseUnitPrice: 0,
        PurchaseQuantity: 0,
        StockQuantity: 0,
        PurchaseWeight: 0,
        PurchaseAmount: 0,
        DocumentStatus: "",
        CreationTime: "",
        };
        subtotal.PurchaseUnitPrice += data[i].PurchaseUnitPrice;
        subtotal.PurchaseQuantity += data[i].PurchaseQuantity;
        subtotal.StockQuantity += data[i].StockQuantity;
        subtotal.PurchaseWeight += data[i].PurchaseWeight;
        subtotal.PurchaseAmount += data[i].PurchaseAmount;
        dom += ` <tr>
            <th>${data[i].number}</th>
            <th>${data[i].SupplierName}</th>
            <th>${data[i].ProductName}</th>
            <th>${data[i].ProductAlias}</th>
            <th>${data[i].ProductCategory}</th>
            <th>${data[i].ProductUnit}</th>
            <th>${data[i].PurchaseUnitPrice}</th>
            <th>${data[i].PurchaseQuantity}</th>
            <th>${data[i].StockQuantity}</th>
            <th>${data[i].PurchaseWeight}</th>
            <th>${data[i].PurchaseAmount}</th>
            <th>${data[i].DocumentStatus}</th>
            <th>${data[i].CreationTime}</th>
        </tr>`;
        for (let j = 0; j < data[i].children.length; j++) {
        subtotal.PurchaseUnitPrice += data[i].children[j].PurchaseUnitPrice;
        subtotal.PurchaseQuantity += data[i].children[j].PurchaseQuantity;
        subtotal.StockQuantity += data[i].children[j].StockQuantity;
        subtotal.PurchaseWeight += data[i].children[j].PurchaseWeight;
        subtotal.PurchaseAmount += data[i].children[j].PurchaseAmount;
        dom += ` <tr>
            <th>${data[i].children[j].number}</th>
            <th>${data[i].children[j].SupplierName}</th>
            <th>${data[i].children[j].ProductName}</th>
            <th>${data[i].children[j].ProductAlias}</th>
            <th>${data[i].children[j].ProductCategory}</th>
            <th>${data[i].children[j].ProductUnit}</th>
            <th>${data[i].children[j].PurchaseUnitPrice}</th>
            <th>${data[i].children[j].PurchaseQuantity}</th>
            <th>${data[i].children[j].StockQuantity}</th>
            <th>${data[i].children[j].PurchaseWeight}</th>
            <th>${data[i].children[j].PurchaseAmount}</th>
            <th>${data[i].children[j].DocumentStatus}</th>
            <th>${data[i].children[j].CreationTime}</th>
        </tr>`;
        if (data[i].children.length == j + 1) {
            total.PurchaseUnitPrice += subtotal.PurchaseUnitPrice;
            total.PurchaseQuantity += subtotal.PurchaseQuantity;
            total.StockQuantity += subtotal.StockQuantity;
            total.PurchaseWeight += subtotal.PurchaseWeight;
            total.PurchaseAmount += subtotal.PurchaseAmount;
            dom += ` <tr>
            <th>${subtotal.number}</th>
            <th>${subtotal.SupplierName}</th>
            <th>${subtotal.ProductName}</th>
            <th>${subtotal.ProductAlias}</th>
            <th>${subtotal.ProductCategory}</th>
            <th>${subtotal.ProductUnit}</th>
            <th>${subtotal.PurchaseUnitPrice}</th>
            <th>${subtotal.PurchaseQuantity}</th>
            <th>${subtotal.StockQuantity}</th>
            <th>${subtotal.PurchaseWeight}</th>
            <th>${subtotal.PurchaseAmount}</th>
            <th>${subtotal.DocumentStatus}</th>
            <th>${subtotal.CreationTime}</th>
        </tr>`;
        }
        }
        if(i == c_length - 1){
            dom += ` <tr>
            <th>${total.number}</th>
            <th>${total.SupplierName}</th>
            <th>${total.ProductName}</th>
            <th>${total.ProductAlias}</th>
            <th>${total.ProductCategory}</th>
            <th>${total.ProductUnit}</th>
            <th>${total.PurchaseUnitPrice}</th>
            <th>${total.PurchaseQuantity}</th>
            <th>${total.StockQuantity}</th>
            <th>${total.PurchaseWeight}</th>
            <th>${total.PurchaseAmount}</th>
            <th>${total.DocumentStatus}</th>
            <th>${total.CreationTime}</th>`
        }
    }
    $("tbody").html(dom);
}
//初始化页码
function initPage(data){
    let temp = data.length / pageSize;
    let dom = "";
    for(let i = 0;i < temp;i++){
        dom += `<li>${i+1}</li>`
    }
    $("#op_box").html(dom);
    setActiveCss();
}
//上一页
function nextL(){
    if(currentPage == 1) return
    currentPage--;
    setActiveCss();
}
//下一页
function nextR(){
    if(currentPage == 3) return
    currentPage++;
    setActiveCss();
}
//设置页码样式
function setActiveCss(){
    $("#op_box").children().removeClass("op_active");
    $("#op_box").children().eq(currentPage - 1).addClass("op_active");
    setData();
}
//tab区域
$("#tabs").children().each((index, item) => {
  $(item).click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("#content").children().eq(index).addClass("show").siblings().removeClass("show");
    if(index == 0){
        $(".screen_box").show();
        $(".content").show();
    }else{
        $(".screen_box").hide();
        $(".content").hide();
    }
  });
});
//筛选
$("#screen").click(function(){
    let number = $("#number").val();
    let SupplierName = $("#SupplierName").val();
    let ProductName = $("#ProductName").val();
    let ProductAlias = $("#ProductAlias").val();
    let ProductCategory = $("#ProductCategory").val();
    let ProductUnit = $("#ProductUnit").val();
    let DocumentStatus = $("#DocumentStatus").val();
    if(number)filterData('number',number)
    if(SupplierName)filterData('SupplierName',SupplierName)
    if(ProductName)filterData('ProductName',ProductName)
    if(ProductAlias)filterData('ProductAlias',ProductAlias)
    if(ProductCategory)filterData('ProductCategory',ProductCategory)
    if(ProductUnit)filterData('ProductUnit',ProductUnit)
    if(DocumentStatus)filterData('DocumentStatus',DocumentStatus)
   
})
//筛选数据
function filterData(name,value){
    tempData = tempData.filter((item)=>{
        return item[name].indexOf(value) > -1;
    })
    setData(tempData);
    pageSize = 2;
    currentPage = 1;
    initPage(tempData);
}
//重置
$("#reset").click(function(){
    $("#number").val("");
    $("#SupplierName").val("");
    $("#ProductName").val("");
    $("#ProductAlias").val("");
    $("#ProductCategory").val("");
    $("#ProductUnit").val("");
    $("#DocumentStatus").val("");
    tempData = JSON.parse(localStorage.getItem("data"));
    setData(tempData);
    pageSize = 2;
    currentPage = 1;
    initPage(tempData);
})
//点击选择页数
$("#op_box").on("click","li",function(){
    currentPage = $(this).text();
    setActiveCss();
})
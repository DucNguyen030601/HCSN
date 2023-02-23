
window.addEventListener('load',function(){
    // AddEventInputFormEdit();
    new Employee();
    AddEventFormEdit()
    ValidateFormEdit();
    AddEventDropdown();
})
//validate form edit
// function AddEventInputFormEdit(){
//     const inputs = document.querySelectorAll('.popup .popup-form__grid input');
//     inputs.forEach(i=>{i.addEventListener("blur",ValidateFormEdit)})
// }

class Employee {
    constructor() {
        this.onLoadData();
    }
    onLoadData() {
        const table = document.querySelector('.content .table-section table');
        const ths= table.querySelectorAll('thead tr th');
        const tBody = table.querySelector('.tBody');
        fetch('https://apidemo.laptrinhweb.edu.vn/api/v1/Employees')
            .then(res => res.json())
            .then(data => {
         
                //Get all data from api and then use for
                data.forEach(element => {
                    //create each row of table
                    let tr = document.createElement('tr');
                    ths.forEach(item => {
                        //create each cell corresponding to the titel
                        let model = item.getAttribute('name');
                        if(model=="checkbox"){
                            let checkbox = document.createElement('input');
                            checkbox.setAttribute('type','checkbox');
                            tr.append(checkbox);
                            debugger
                        }
                    });

                });
            });
    }
}

function AddEventFormEdit(){
    const txtNguyenGia =document.getElementById('txtNguyenGia');
    const txtTiLeHM = document.getElementById('txtTiLeHM');
    const txtGiaTriHM = document.getElementById('txtGiaTriHM');
    txtNguyenGia.oninput=function(){
        let ng = parseFloat(formatMoney(txtNguyenGia.value.trim()));
        let tl = parseFloat(txtTiLeHM.value.trim());
        txtGiaTriHM.value = convertMoney(ng * tl);
    }
    txtTiLeHM.oninput=function(){
        let ng = parseFloat(formatMoney(txtNguyenGia.value.trim()));
        let tl = parseFloat(txtTiLeHM.value.trim());
        txtGiaTriHM.value = convertMoney(ng * tl);
    }
}
function formatMoney(s){
        return s.replaceAll('.','');
}
function convertMoney(s){
    s = s.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    return s.substring(0,s.length-2);
}

function ValidateFormEdit(){
    const popup = document.querySelector('.popup');
    const items = popup.querySelectorAll('.grid__item');
    items.forEach(item =>{
        const lable = item.querySelector('label').textContent;
        const input = item.querySelector('input');
        const txtEr = item.querySelector('.txt--error');
        input.addEventListener('blur',()=>{
            let value = input.value.trim();
            if(value){
                input.removeAttribute('style');
                txtEr.innerText = "";
            }
            else{
                input.style.border="solid 1px red";
                txtEr.innerText = lable.substring(0,lable.length-1) +"không được để trống!";
            }
        })
    })
    const btnSave = popup.querySelector('.popup-form__footer #btnSave');
    btnSave.addEventListener('click',()=>{
        if(checkTextBoxForm()){
            alert('ok');
        }
    })
}
function checkTextBoxForm(){
    const txtMaTaiSan = document.getElementById('txtMaTaiSan').value.trim();
    const txtTenTaiSan =document.getElementById('txtTenTaiSan').value.trim();
    const txtMaBPSD = document.getElementById('txtMaBPSD').value.trim();
    const txtMaLoaiTS = document.getElementById('txtMaLoaiTS').value.trim();
    const txtSoLuong =document.getElementById('txtSoLuong').value.trim();
    const txtNguyenGia =document.getElementById('txtNguyenGia').value.trim(); 
    const txtGiaTriHM =document.getElementById('txtGiaTriHM').value.trim(); 

    if(!txtMaTaiSan){ ShowDialog('Cần phải nhập thông tin Mã tài sản'); return false; }
    if(!txtTenTaiSan){ ShowDialog('Cần phải nhập thông tin Tên tài sản'); return false; }
    if(!txtMaBPSD){ ShowDialog('Cần phải chọn thông tin Mã loại bộ phận sử dụng'); return false; }
    if(!txtMaLoaiTS){ ShowDialog('Cần phải chọn thông tin Mã loại tài sản'); return false; }
    if(!txtSoLuong){ ShowDialog('Cần phải nhập thông tin Số lượng'); return false; }
    if(!txtNguyenGia){ ShowDialog('Cần phải nhập thông tin Nguyên giá'); return false; }
    if(txtGiaTriHM > txtNguyenGia){ShowDialog('Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá'); return false;}
    return true;
}
//close sidebar
function CloseSideBar() {
    let sizeSideBar = document.getElementsByClassName('sidebar')[0].offsetWidth;
    let sizeHeader= document.getElementsByClassName('header')[0].offsetWidth;
    let sizeContent= document.getElementsByClassName('content')[0].offsetWidth;

    if(sizeSideBar == 200){
       StateSidebar(66,'none','open',sizeHeader + 200 - 66,sizeContent+200-66);
    } 
    else{
        StateSidebar(200,'flex','close',sizeContent - 200 + 66,sizeContent -200+66);
    }
}
function StateSidebar(width,display,icon,header,content){
   let itemMenu = document.querySelectorAll('.sidebar .menu-item__list');
    itemMenu.forEach(element => {
    element.style.display=display;
    });
    document.getElementsByClassName('sidebar')[0].style.width = `${width}px`;
    event.target.setAttribute("class", `icon-${icon}-sidebar`);
    document.getElementsByClassName('header')[0].style.width =`${header}px`;
    document.getElementsByClassName('content')[0].style.width =`${content}px`;
}

//close popup
function ClosePopup(event){
    var popup = event.offsetParent.offsetParent;
    
    const items = popup.querySelectorAll('.grid__item');
    items.forEach(item =>{
         item.querySelector('input').value='';
         item.querySelector('input').removeAttribute('style');
         let txtEr = item.querySelector('.txt--error');
         if(txtEr) txtEr.innerHTML='';
    })
    popup.style.display="none";
}
function OpenPopup(event){

    if(event){
        var row = event.parentElement.parentElement;
        document.getElementById('txtMaTaiSan').value = row.cells[2].innerText;
        document.getElementById('txtTenTaiSan').value = row.cells[3].innerText;
        document.getElementById('txtTenBPSD').value = row.cells[5].innerText;
        document.getElementById('txtTenLoaiTS').value = row.cells[4].innerText;
        document.getElementById('txtSoLuong').value = row.cells[6].innerText;
        document.getElementById('txtNguyenGia').value = row.cells[7].innerText;
    }
        document.getElementById('txtNgayMua').valueAsDate = new Date();
        document.getElementById('txtNgayBDSD').valueAsDate = new Date();

    var popup = document.getElementsByClassName("popup");
    var titile = popup.querySelector('.popup-form .popup-form__header h2');
    titile.textContent=""
    popup[0].style.display="block";
}

//add Event Combobox
function AddEventDropdown(){
    const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const select = dropdown.querySelector('.dropdown__select');
            const menu = dropdown.querySelector('.dropdown__menu');
            const caret = dropdown.querySelector('.dropdown__select .icon-dr-down')
            const options = dropdown.querySelectorAll('.dropdown__menu li');
            const selected = dropdown.querySelector('.selected');

            caret.addEventListener('click', () => {
                let display = getComputedStyle(menu).display;
                menu.style.display = (display == "none" ? "block" : "none");
                options.forEach(option => {
                    if (selected.value == option.outerText) option.classList.add('active');
                    else option.classList.remove('active');
                });
                menu.addEventListener('mouseleave', () => {
                    menu.style.display = 'none';
                })
            })
            options.forEach(option => {
                option.addEventListener('click', () => {
                    selected.value = option.outerText;
                    menu.style.display = 'none';
                })
            })
        })
}

//show dialog
function ShowDialog(text){
    const dialog = document.querySelector('.dialog');
    const content = dialog.querySelector('.body__content');
    content.innerText=text;
    dialog.style.display = 'block';

    const btnCancel = document.querySelector('.dialog__footer #btnCancel');
    btnCancel.addEventListener('click',()=>{
        dialog.style.display='none';
    }) 
}


window.addEventListener('load', function () {
    // AddEventInputFormEdit();
   

    AddEventTable();
    AddEventFormEdit()
    ValidateFormEdit();
    AddEventDropdown();
})
//validate form edit
// function AddEventInputFormEdit(){
//     const inputs = document.querySelectorAll('.popup .popup-form__grid input');
//     inputs.forEach(i=>{i.addEventListener("blur",ValidateFormEdit)})
// }


function AddEventFormEdit() {
    const txtNguyenGia = document.getElementById('txtNguyenGia');
    const txtTiLeHM = document.getElementById('txtTiLeHM');
    const txtGiaTriHM = document.getElementById('txtGiaTriHM');
    txtNguyenGia.oninput = function () {
        let ng = parseFloat(formatMoney(txtNguyenGia.value.trim()));
        let tl = parseFloat(txtTiLeHM.value.trim());
        txtGiaTriHM.value = convertMoney(ng * tl);
    }
    txtTiLeHM.oninput = function () {
        let ng = parseFloat(formatMoney(txtNguyenGia.value.trim()));
        let tl = parseFloat(txtTiLeHM.value.trim());
        txtGiaTriHM.value = convertMoney(ng * tl);
    }
    
}
function formatMoney(s) {
    return s.replaceAll('.', '');
}
function convertMoney(s) {
    s = s.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    return s.substring(0, s.length - 2);
}

function ValidateFormEdit() {
    const popup = document.querySelector('.popup');
    const items = popup.querySelectorAll('.grid__item');
    items.forEach(item => {
        const lable = item.querySelector('label').textContent;
        const input = item.querySelector('input');
        const txtEr = item.querySelector('.txt--error');
        input.addEventListener('blur', () => {
            let value = input.value.trim();
            if (value) {
                input.removeAttribute('style');
                txtEr.innerText = "";
            }
            else {
                input.style.border = "solid 1px red";
                txtEr.innerText = lable.substring(0, lable.length - 1) + "không được để trống!";
            }
        })
    })
    const btnSave = popup.querySelector('.popup-form__footer #btnSave');
    btnSave.addEventListener('click', () => {
        if (checkTextBoxForm()) {
            alert('ok');
        }
    })
}
function checkTextBoxForm() {
    const txtMaTaiSan = document.getElementById('txtMaTaiSan').value.trim();
    const txtTenTaiSan = document.getElementById('txtTenTaiSan').value.trim();
    const txtMaBPSD = document.getElementById('txtMaBPSD').value.trim();
    const txtMaLoaiTS = document.getElementById('txtMaLoaiTS').value.trim();
    const txtSoLuong = document.getElementById('txtSoLuong').value.trim();
    const txtNguyenGia = document.getElementById('txtNguyenGia').value.trim();
    const txtGiaTriHM = document.getElementById('txtGiaTriHM').value.trim();

    if (!txtMaTaiSan) { ShowDialog('Cần phải nhập thông tin Mã tài sản'); return false; }
    if (!txtTenTaiSan) { ShowDialog('Cần phải nhập thông tin Tên tài sản'); return false; }
    if (!txtMaBPSD) { ShowDialog('Cần phải chọn thông tin Mã loại bộ phận sử dụng'); return false; }
    if (!txtMaLoaiTS) { ShowDialog('Cần phải chọn thông tin Mã loại tài sản'); return false; }
    if (!txtSoLuong) { ShowDialog('Cần phải nhập thông tin Số lượng'); return false; }
    if (!txtNguyenGia) { ShowDialog('Cần phải nhập thông tin Nguyên giá'); return false; }
    if (txtGiaTriHM > txtNguyenGia) { ShowDialog('Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá'); return false; }
    return true;
}
//close sidebar
function CloseSideBar() {
    //lấy các kích thước mặc định ban đầu của từng layout 
    let sizeSideBar = document.getElementsByClassName('sidebar')[0].offsetWidth;
    let sizeHeader = document.getElementsByClassName('header')[0].offsetWidth;
    let sizeContent = document.getElementsByClassName('content')[0].offsetWidth;

    const SIZE_OPEN = 220;
    const SIZE_CLOSE = 66;

    //nếu kích thước bằng SIZE_OPEN thì sẽ cho sidebar bằng kích thước SIZE_CLOSE 
    //đồng thời tăng kích thước layout còn lại tương ứng với màn hình 
    //còn không thì ngược lại
    if (sizeSideBar == SIZE_OPEN) {
        //Hàm trạng thái thay đổi kích thước layout khi sidebar đóng
        StateSidebar(SIZE_CLOSE, 'none', 'open', sizeHeader + SIZE_OPEN - SIZE_CLOSE, sizeContent + SIZE_OPEN - SIZE_CLOSE);
    }
    else {
        //Hàm trạng thái thay đổi kích thước layout khi sidebar mở
        StateSidebar(SIZE_OPEN, 'flex', 'close', sizeHeader - SIZE_OPEN + SIZE_CLOSE, sizeContent - SIZE_OPEN + SIZE_CLOSE);
    }
}
function StateSidebar(width, display, icon, header, content) {
    let itemMenu = document.querySelectorAll('.sidebar .menu-item__list');
    itemMenu.forEach(element => {
        element.style.display = display;
    });
    document.getElementsByClassName('sidebar')[0].style.width = `${width}px`;
    event.target.setAttribute("class", `icon-${icon}-sidebar`);
    document.getElementsByClassName('header')[0].style.width = `${header}px`;
    document.getElementsByClassName('content')[0].style.width = `${content}px`;
}

//close popup
function ClosePopup(event) {
    var popup = event.offsetParent.offsetParent;

    const items = popup.querySelectorAll('.grid__item');
    items.forEach(item => {
        item.querySelector('input').value = '';
        item.querySelector('input').removeAttribute('style');
        let txtEr = item.querySelector('.txt--error');
        if (txtEr) txtEr.innerHTML = '';
    })
    popup.style.display = "none";
}
function OpenPopup(event, type) {
    var popup = document.querySelector(".popup");
    var title = popup.querySelector(".popup-form .popup-form__header h2");

    if (type == 1) {
        title.textContent = "Thêm tài sản";
    }
    else if (type == 2) {
        title.textContent = "Sửa tài sản";
        var row = event.parentElement.parentElement;
        document.getElementById('txtMaTaiSan').value = row.cells[2].innerText;
        document.getElementById('txtTenTaiSan').value = row.cells[3].innerText;
        document.getElementById('txtTenBPSD').value = row.cells[5].innerText;
        document.getElementById('txtTenLoaiTS').value = row.cells[4].innerText;
        document.getElementById('txtSoLuong').value = row.cells[6].innerText;
        document.getElementById('txtNguyenGia').value = row.cells[7].innerText;
    }
    else {
        title.textContent = "Nhân bản tài sản";
        var row = event.parentElement.parentElement;
        document.getElementById('txtTenTaiSan').value = row.cells[3].innerText;
        document.getElementById('txtTenBPSD').value = row.cells[5].innerText;
        document.getElementById('txtTenLoaiTS').value = row.cells[4].innerText;
        document.getElementById('txtSoLuong').value = row.cells[6].innerText;
        document.getElementById('txtNguyenGia').value = row.cells[7].innerText;
    }

    document.getElementById('txtNgayMua').valueAsDate = new Date();
    document.getElementById('txtNgayBDSD').valueAsDate = new Date();
    popup.style.display = "block";
}

//add Event Combobox
function AddEventDropdown() {
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
function ShowDialog(text,type) {
    const dialog = document.querySelector('.dialog');
    const content = dialog.querySelector('.dialog-form__body .body__content');
    const btns = dialog.querySelectorAll('.dialog-form__footer button');
    content.innerHTML = text;
    dialog.style.display = 'block';

    //type = 1 huỷ bỏ tài sản
    //type = 2 Sửa thay đổi thông tin
    //type = 3 Xoá
    //type = 4 Xoá 1 bản ghi đã có phát sinh
    //type = 5 Xoá nhiều bản ghi đã có phát sinh
    btns[1].style.display='none';
    btns[2].style.display='none';

    btns[1].removeAttribute('id');
    btns[2].removeAttribute('id');
    btns[0].removeAttribute('id');
    switch (type) {
        case 1:
            btns[0].textContent="Huỷ bỏ";
            btns[2].textContent="Không"
            btns[2].style.display="block";
            btns[2].setAttribute('id','btnCancel');
            break;
        case 2:
            btns[0].textContent="Lưu";
            btns[1].textContent="Không lưu";
            btns[2].textContent="Huỷ bỏ";
            btns[1].style.display='block';
            btns[2].style.display='block';
            btns[2].setAttribute('id','btnCancel');
            break;
        case 3:
            btns[0].textContent="Xoá";
            btns[2].textContent="Không"
            btns[2].style.display="block";
            btns[2].setAttribute('id','btnCancel');
            break;
        case 4:
            btns[0].textContent="Đóng";
            btns[0].setAttribute('id','btnCancel');
            break;
        case 5:
            btns[0].textContent="Đồng ý";
            btns[0].setAttribute('id','btnCancel');
            break;
        default:
            break;
    }

    const btnCancel = document.querySelector('.dialog-form__footer #btnCancel');
    btnCancel.addEventListener('click', () => {
        dialog.style.display = 'none';
    })
}

//Add event table check row
function AddEventTable() {
    const table = document.querySelector('.table-section table');
    //lấy checkbox tiêu đề
    const headCheckBox = table.querySelector('thead tr th input');

    const trBody = table.querySelectorAll('tbody tr');

    //khi checkbox vào ô tiêu đề thì sẽ cho tất cả check hết
    headCheckBox.onchange = () => {
        CheckBoxItems(trBody, headCheckBox.checked);
    }

    trBody.forEach(item => {
        let checkbox = item.querySelector('input');
        checkbox.onchange = () => {
            item.classList.toggle('table-row-check');
            headCheckBox.checked = checkBoxTitle(trBody);
        }

        let td = item.querySelectorAll('td:not(:last-child,:first-child)');
        td.forEach(element => {
            element.onclick = () => {
                checkbox.checked = !checkbox.checked;
                item.classList.toggle('table-row-check');
                headCheckBox.checked = checkBoxTitle(trBody);
            }
        });
    });

}
function CheckBoxItems(trBody, check) {
    trBody.forEach(item => {
        let checkbox = item.querySelector('input');
        checkbox.checked = check;
        //nếu checkboxHead bằng true thì thêm class màu còn không ngược lại xoá đi
        check ? item.classList.add('table-row-check') : item.classList.remove('table-row-check');
    })
}

function checkBoxTitle(trBody) {
    var c = true;
    trBody.forEach(item => {
        let checkbox = item.querySelector('input');
        if (!checkbox.checked) { c = false; }
    });
    return c;
}

function getEmployees(table){
    const trBody = table.querySelectorAll('tbody tr');
    var employees=[];
    trBody.forEach(item => {
        let checkbox = item.querySelector('input');
        
        if(checkbox.checked){
            let employee = {
                "id":item.cells[2].innerText,
                "name":item.cells[3].innerText
            };
            employees.push(employee); 
        }
    });
    return employees;
}

function RemoveEmployees(){
    const table = document.querySelector('.table-section table');
    var data = getEmployees(table);
    if(data.length==0){
        ShowDialog(`Mời bạn chọn 1 tài sản để xoá`,4);
    }
    else if(data.length==1){
        ShowDialog(`Bạn có muốn xoá tài sản <span style ="font-weight:bold"><<${data[0].id} - ${data[0].name}>></span>?`,3);
    }
    else{
        let mount = data.length>9?data.length:('0'+ data.length);
        ShowDialog(`<span style ="font-weight:bold">${mount}</span> tài sản đã được chọn. Bạn có muốn xoá các tài sản khỏi danh sách?`,3);
    }
}
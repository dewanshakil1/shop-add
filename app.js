// get element
const product_from = document.getElementById('productfrom');
const show_modal = document.getElementById('show_modal');
const singleModal = document.querySelector('.singleModal');
const msg = document.querySelector('.msg');
const productList = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');

// submit product form
product_from.onsubmit = (e) => {
	e.preventDefault();
	//   get objet form data
	const form_objet = new FormData(e.target);
	let productData = Object.fromEntries(form_objet.entries());
	let { name, price, Quantity, photo } = Object.fromEntries(
		form_objet.entries()
	);
	//    form validation
	if (!name || !price || !Quantity || !photo) {
		msg.innerHTML = setAlert('All field are requared');
	} else {
		createls('products', productData);
		msg.innerHTML = setAlert('done', 'success');
		e.target.reset();
		allproducts();
	}
};
// get all products
const allproducts = () => {
	// get all ls data
	const data = readlsData('products');

	if (!data) {
		productList.innerHTML = `
  <tr>
  <td  colspan="7" class="text-center">No products found</td>
  </tr>
  `;
	}
	//  show all data list
	if (data) {
		let list = ' ';
		let FinalAmount = 0;
		data.map((item, index) => {
			FinalAmount += item.price * item.Quantity;
			list += `
  <tr style="vertical-align: middle">
  <td>${index + 1}</td>
  <td>${item.name}</td>
  <td>${item.price} tk</td>
  <td>${item.Quantity}</td>
  <td>${item.price * item.Quantity} tk</td>
  <td>
    <img
      style="width: 50px; height: 50px"
      src="${item.photo}"
      alt=""
    />
  </td>
  <td>
    <a href="#show_modal" data-bs-toggle="modal" productIndex ="${index}" class="btn btn-info btn-sm product-view"
      ><i class="fas fa-eye" ></i
    ></a>
    <a href="#showEditmodal"   productIndex ="${index}"  data-bs-toggle="modal" class="btn btn-warning btn-sm  product-edit"
      ><i class="fas fa-edit"></i
    ></a>
    <a href="" class="btn btn-danger btn-sm  product-delete" productIndex ="${index}"
      ><i class="fas fa-trash"></i
    ></a>
  </td>
</tr>
  `;
		});
		list += `<tr>
  <td colspan="6" class="text-end">Final Amount : ${FinalAmount} taka </td>
  <td></td>
</tr>`;
		productList.innerHTML = list;
	}
};
allproducts();
//product update
product_update_form.onsubmit = (e) => {
	e.preventDefault();
	// get form data
	let inde = e.target.getAttribute('productIndex');

	const form_data = new FormData(e.target);
	const { name, price, photo, Quantity, index } = Object.fromEntries(
		form_data.entries()
	);

	// get all data
	let all_data = readlsData('products');

	all_data[index] = {
		name,
		price,
		Quantity,
		photo,
	};

	// update your data
	updateLsdata('products', all_data);
	//  data reload
	allproducts();
};
// single product show
productList.onclick = (e) => {
	e.preventDefault();
	if (e.target.classList.contains('product-view')) {
		let index = e.target.getAttribute('productIndex');
		let data = readlsData('products');
		const { name, price, photo } = data[index];
		singleModal.innerHTML = `
    <img
    class="shadow"
    src="${photo}"
    alt=""
   />
   <h1>${name}</h1>
   <p>${price}</p>
    `;
	}
	if (e.target.classList.contains('product-edit')) {
		let index = e.target.getAttribute('productIndex');
		let data = readlsData('products');
		const { name, price, photo, Quantity } = data[index];
		product_update_form.innerHTML = `
              <div class="my-3">
								<label for="">Name :</label>
								<input type="text" name="name" value="${name}" id="" class="form-control" />
							</div>
							<div class="my-3">
								<label for="">Price :</label>
								<input type="text" name="price" value="${price}" id="" class="form-control" />
							</div>
							<div class="my-3">
								<label for="">Quantity :</label>
								<input type="text" name="Quantity" value="${Quantity}" id="" class="form-control" />
							</div>
							<div class="my-3">
								<img
									class="w-75 h-75 rounded-3 m-auto d-block"
									src="${photo}"
									alt=""
								/>
							</div>
               <div class="my-3">
                <label for="">photo :</label>
                  <input type="text" name="photo" value="${photo}" id="" class="form-control" />
              </div>

              <input type="hidden" name="index" value="${index}"/>
							<div class="my-3">
								<input
									type="submit"
									class="btn btn-primary w-100 text-white rounded-pill p-2"
									value="Update now"
								/>
							</div>


              `;
	}
	if (e.target.classList.contains('product-delete')) {
		let index = e.target.getAttribute('productIndex');
		let data = readlsData('products');
		data.splice(index, 1);
		updateLsdata('products', data);
		allproducts();
	}
};

const elFilters = document.querySelector('.filters');

let cont = document.querySelector('.container');
let contHTML = "";


// MODEL

/*
const params = {
	gender: { val: '', name: 'Gender', kind: 'select', list: [
	    { val: '', name: 'ALL'},
            { val: 'male', name: 'MALE'},
	    { val: 'female', name: 'FEMALE'} 				
	]},
	name: { val: '', name: 'Name', kind: 'input'}
};
*/

const params = {
	vendor: { val: '', name: 'Виробник', kind: 'select', list: [
	    { val: '', name: 'Всі'},
	    { val: 'Lenovo', name: 'Lenovo'},
            { val: 'Asus', name: 'Asus'},
            { val: 'HP', name: 'HP'},
	    { val: 'Acer', name: 'Acer'} 				
	]},
	cpu: { val: '', name: 'Процесор', kind: 'select', list: [
	    { val: '', name: 'Всі'},
	    { val: 'Intel', name: 'Intel'},
            { val: 'AMD', name: 'AMD'}				
	]},
	display: { val: '', name: 'Діагональ', kind: 'select', list: [
	    { val: '', name: 'Всі'},
	    { val: '14', name: '14'},
            { val: '15', name: '15'}				
	]},
	memory: { val: '', name: 'Оперативна память, Гб', kind: 'select', list: [
	    { val: '', name: 'Всі'},
	    { val: '8', name: '8'},
            { val: '16', name: '16'}				
	]},
	ssd: { val: '', name: 'Обсяг SSD, Гб', kind: 'select', list: [
	    { val: '', name: 'Всі'},
	    { val: '256', name: '256'},
            { val: '512', name: '512'}				
	]}
};


const profiles = []

const updateFilter = (name, value) => {
    console.log(name,value);
    params[name].val = value;
}


// CONTROLER

const getProfiles = async () => {
        const qeryPatams = {};
	Object.keys(params).forEach(key => {
	   qeryPatams[key] = params[key].val			
        })

	const result = await axios.get('/prod', { params: qeryPatams });

	console.log(result);
        
        let res = result.data;
	let contHTML = "";
        for (let i=0; i<res.length; i++) {
	   contHTML += `
		<div>
		--- ID:       ${res[i].id}
		--- Тип  :    ${res[i].type}
		--- Виробник: ${res[i].vendor}
		--- Модель:   ${res[i].model}
		--- Процесор: ${res[i].cpu}
		--- Дисплей:  ${res[i].display}
		--- ОЗУ, Гб:  ${res[i].memory}
		--- SSD, Гб:  ${res[i].ssd}
		</div> <br>`;
           }

           cont.innerHTML = contHTML;

};

const updateProfiles = (name, value) => {
	updateFilter(name,value);
	getProfiles();
}


// VIEW

const buildSel = (name,data) => {
	const htmlOptions = data.list.map((item) => {
             const html = `<option value="${item.val}" ${data.val === item.val ? 'selected' : ''}>${item.name}</option>`;
             return html; 
	}).join('');
	const html = `<select name="${name}">${htmlOptions}</select>`;
	return html;
}

const buildInput = (name,data) => {
	const html = `<input name="${name}" value="${data.val}">`;
	return html;
}


const renderFilter = () => {
	const  names = Object.keys(params);
        const html = names.map((name) => {
		const item = params[name];
                
		if(item.kind === 'select') {
			return `<label> ${item.name}: ${buildSel(name, item)} </label><br>`;
		}
  
		if(item.kind === 'input') {
			return `<label> ${item.name}: ${buildInput(name, item)} </label><br>`;
		}
  
	}).join('');


        elFilters.innerHTML = html;

        console.log(html);

}

// RUNER	

const run = () => {
              
       getProfiles();
   
       renderFilter(); 
	
       elFilters.querySelectorAll('[name]').forEach((el) => {
	   el.addEventListener('change', (ev) => {
	        const val = ev.target.value;
	        const name = ev.target.name;
		updateProfiles(name,val);
		
          });

       });
	


};

run();
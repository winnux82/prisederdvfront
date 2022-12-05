const office = {
    data: [],

};

office.init = function () {
    //get DOM elements
    office.tableContent = document.querySelector('#container-list table tbody')
    //console.log(office.tableContent,'office.tableContent')

    office.data = office.getAll();
    //console.log('Initialisation du controller office');
    office.renderTable();
}

office.renderTable = () => {
    let content = '';
    office.data.forEach((e, index) => {
        content += `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>
            <button class="btn btn-primary" onclick="office.edit(${index})">M</button>
            <button class="btn btn-danger" onclick="office.remove(${index})">S</button>
            </td>
        </tr>
        `;
    });
    //console.log(content);
    office.tableContent.innerHTML = content;
    
}

office.toggleForm = () => {
    $('#office-form form input').val('');
    $('#container-list,#office-form').toggle();
}

office.edit = (index)=>{
    console.log('edit');
    office.toggleForm();
    if (index !== undefined) {
        office.fillForm(index);
    }
}

office.save = (event) => {
    event.preventDefault();
    const id = $('input[name="id"]').val();
    const name = $('input[name="name"]').val();
    if (name.trim().length === 0) {
        alert('Tous les champs sont obligatoires !!');
        return;
    }
    
    // console.log('id', id);
    // console.log('name', name);

    const record = office.data.find(d => d.id == id);
    //EDITION
    if (record) {
        //console.log('record'.record)
        record.name = name;
    }
    //AJOUT
    else {
        let biggerId = office.data.length == 0 ? 0 : office.data[office.data.length - 1].id;
        office.data.push({
            id: ++biggerId,
            name

        })
        

    }
    office.renderTable();
    office.toggleForm();


}

office.fillForm = (index) => {
    const record = office.data[index];
    if (record != null) {
        $('input[name="id"]').val(record.id);
        $('input[name="name"]').val(record.name);

    }
}

office.remove = (index) => {
    //console.log('Remove', index);
    const record = office.data[index];
    if (record != null &&confirm(`Voulez-vous vraiment supprimer ce bureau: ${record.name}? `)) {
        office.data.splice(index, 1);
        office.renderTable();
    }
}

office.getAll = () => {
    //MOCK

    return [
        {
            id: 1,
            name: "Bureau 1"
        },
        {
            id: 2,
            name: "Bureau 2"
        },
        {
            id: 3,
            name: "Bureau 3"
        }
    ]
};

app.controllers.office = office;


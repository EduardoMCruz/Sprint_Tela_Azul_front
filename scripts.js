/* Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/aparelhos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("myTableBody").innerHTML = "";
      data.aparelhos.forEach(item => insertList(item.codigo, item.nome, item.telefone, item.categoria, item.especialidade, item.c_data, item.c_hora))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
/*    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
*/

getList()
  
/* Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
*/
const postItem = async (inputCode, inputName, inputC_number, inputC_category, inputRoom, inputC_date, inputC_time) => {
  const formData = new FormData();
  formData.append('codigo', inputCode);
  formData.append('nome', inputName);
  formData.append('telefone', inputC_number);
  formData.append('categoria', inputC_category);
  if (inputRoom != "") formData.append('especialidade', inputRoom);
  if (inputC_date != "") formData.append('c_date', inputC_date);
  if (inputC_time != "") formData.append('c_hora', inputC_time);
  let url = 'http://127.0.0.1:5000/aparelho';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => {
    console.log("response: ",response.json());
    console.log("status:",response.ok);
    if (response.ok) {
      alert("Aparelho adicionado com sucesso!");
      closeIncludeModal();
      getList();
    }
    else {
      alert("Erro: item não adicionado");
    }
  })
  .catch((error) => {
    console.error('Error:', error);        
  });
  }
    
/* Função para criar um botão excluir para cada item da lista
    --------------------------------------------------------------------------------------
*/
  
const insertButton = (parent) => {
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-trash"; 
  parent.appendChild(icon);

}
 
/* Função para remover um item da lista de acordo com o click no botão excluir
    --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let lixeira = document.getElementsByClassName("fa-solid fa-trash");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < lixeira.length; i++) {
    lixeira[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja excluir o aparelho?")) {
        deleteItem(nomeItem)
        alert("Aparelho removido com sucesso!")
        getList()
      }
    }
  }
}

/* Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/aparelho?codigo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
     console.error('Error:', error);
    });
  }

/* Função para criar um botão edit para cada item da lista
    --------------------------------------------------------------------------------------
*/
const insertEditButton = (parent) => {
  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen";
  parent.appendChild(editIcon);
}
  
/* Função para editar um item da lista de acordo com o click no botão edit
      --------------------------------------------------------------------------------------
*/
    
const getElement = () => {
  let editar = document.getElementsByClassName("fa-solid fa-pen");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < editar.length; i++) {
    editar[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      const modal = document.getElementById("myModal");
      getItem(nomeItem)
      modal.style.display = "block";
    }
  }
}
   
/* Função para chamar dados de um item da lista do servidor via requisição GET
      --------------------------------------------------------------------------------------
*/
const getItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/aparelho?codigo=' + item;
  fetch(url, {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(JSON.stringify(data));
    let inputCodigo = document.getElementById("editCode")
    inputCodigo.value=item
    let inputNome = document.getElementById("editName");
    inputNome.value = data.nome; 
    let inputTelefone = document.getElementById("editC_number");
    inputTelefone.value = data.telefone; 
    let inputCategoria = document.getElementById("editC_category");
    inputCategoria.value = data.categoria;  
    let inputEspecialidade = document.getElementById("editRoom");
    inputEspecialidade.value = data.especialidade;
    let inputC_data = document.getElementById("editC_date");
    inputC_data.value = data.c_data; 
    let inputC_hora = document.getElementById("editC_time");
    inputC_hora.value = data.c_hora; 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
  
    
/* Função para editar dados de um item da lista do servidor via requisição PUT
      --------------------------------------------------------------------------------------
    */
async function putItem(inputCode, inputName, inputC_number, inputC_category, inputRoom, inputC_date, inputC_time) {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('telefone', inputC_number);
  formData.append('categoria', inputC_category);
  if (inputRoom != "") formData.append('especialidade', inputRoom);
  if (inputC_date != "") formData.append('c_data', inputC_date);
  if (inputC_time != "") formData.append('c_hora', inputC_time);
  let url = 'http://127.0.0.1:5000/aparelho?codigo=' + inputCode;
  fetch(url, {
    method: 'put',
    body: formData
  })
  .then((response) => {
    console.log("response: ", response.json());
    console.log("status:", response.ok);
    if (response.ok) {
      alert("Aparelho editado com sucesso!");
      closeModal();
      getList();
    }
    else {
      alert("Erro: item não editado");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

const editItem = () => {
  let inputCode = document.getElementById("editCode");
  let inputName = document.getElementById("editName");
  let inputC_number = document.getElementById("editC_number");
  let inputC_category = document.getElementById("editC_category");
  let inputRoom = document.getElementById("editRoom").value;
  let inputC_date = document.getElementById("editC_date").value;
  let inputC_time = document.getElementById("editC_time").value;   
  let camposObrigatorios = [editCode, editName, editC_number, editC_category];
  let error = false;
  for (let i = 0; i < camposObrigatorios.length; i++) {
    let campoObrigatorio = camposObrigatorios[i]
    if (campoObrigatorio.value === '') {
      campoObrigatorio.classList.add('newItemFieldError');
      campoObrigatorio.classList.remove('newItemField');
      error = true;
    } else {
      campoObrigatorio.classList.add('newItemField');
      campoObrigatorio.classList.remove('newItemFieldError');
    }
  } 
  if (error) {
    alert("Erro: campos obrigatórios não preenchidos");
  }
  else {
    putItem(inputCode.value, inputName.value, inputC_number.value, inputC_category.value, inputRoom, inputC_date, inputC_time)
  }    
}

/*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo aparelho 
    --------------------------------------------------------------------------------------
*/

const newItem = () => {
  let inputCode = document.getElementById("newCode");
  let inputName = document.getElementById("newName");
  let inputC_number = document.getElementById("newC_number");
  let inputC_category = document.getElementById("newC_category");
  let inputRoom = document.getElementById("newRoom").value;
  let inputC_date = document.getElementById("newC_date").value;
  let inputC_time = document.getElementById("newC_time").value;
   
  let camposObrigatorios = [inputCode, inputName, inputC_number, inputC_category];
  let error = false;
  for (let i = 0; i < camposObrigatorios.length; i++) {
    let campoObrigatorio = camposObrigatorios[i]
    if (campoObrigatorio.value === '') {
      campoObrigatorio.classList.add('newItemFieldError');
      campoObrigatorio.classList.remove('newItemField');
      error = true;
    } else {
      campoObrigatorio.classList.add('newItemField');
      campoObrigatorio.classList.remove('newItemFieldError');
    }
  } 
  if (error) {
    alert("Erro: campos obrigatórios não preenchidos");
  } else {
    postItem(inputCode.value, inputName.value, inputC_number.value, inputC_category.value, inputRoom, inputC_date, inputC_time)
  }
}

/*
    --------------------------------------------------------------------------------------
    Função para inserir itens na lista apresentada
    --------------------------------------------------------------------------------------
*/

const insertList = (code, name, c_number, c_category, room, c_date, c_time) => {
  var item = [code, name, c_number, c_category, room, c_date, c_time]
  var table = document.getElementById('myTableBody');
  var row = table.insertRow();
 
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertEditButton(row.insertCell(-1))
  insertButton(row.insertCell(-1))
  document.getElementById("newCode").value = "";
  document.getElementById("newName").value = "";
  document.getElementById("newC_number").value = "";
  document.getElementById("newC_category").value = "";
  document.getElementById("newRoom").value = "";
  document.getElementById("newC_date").value = "";
  document.getElementById("newC_time").value = "";
  getElement()
  removeElement()
}

/*função para preencher a combobox */

const listEspecialidades = () => {
  document.getElementById("newRoomLabel").textContent="Pediatra:"
  let url = 'http://127.0.0.1:5001/especialidades';
  fetch(url, {
    method: 'get',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const selectElement = document.getElementById('newRoom');
    selectElement.removeChild(selectElement.firstChild);
    data.especialidades.forEach(especialidade => {
      const option = document.createElement('option');
      option.value = especialidade.nome;
      option.textContent = especialidade.nome;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
      console.error('Erro ao buscar os especialidades da API:', error);
  });
}

listEspecialidades() 

/*
const emptyEspecialidades = () => {
  const selectElement = document.getElementById('newRoom');
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }
}
*/

/*Função para fechar o modal de edição
*/

const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

/*Função para abrir o modal de inclusão
*/

const openIncludeModal = () => {
  const modal = document.getElementById("myIncludeModal");
  modal.style.display = "block";
}

/*Função para fechar o modal de inclusão
*/

const closeIncludeModal = () => {
  const modal = document.getElementById("myIncludeModal");
  modal.style.display = "none";
}

/* Função para exportar excel */

document.getElementById("sheetjsexport").addEventListener('click', function() {
  /* Create worksheet from HTML DOM TABLE */
  var wb = XLSX.utils.table_to_book(document.getElementById("myTable"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "lista_aparelhos.xlsx");
});

/* função relacionada aos eventos de abrir e fechar o modal */

document.addEventListener("DOMContentLoaded", function () {
  // Evento de clique no botão "Fechar" do modal
  const closeModalButton = document.querySelector(".close");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      closeModal();
    });
  }
  // Inicialize os eventos apenas após o DOM estar pronto
  getElement();
});

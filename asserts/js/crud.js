//  const api= 'http://localhost:5000/api/quotes';
const api = "https://quotes-backend-bjab.onrender.com";


const getQuotes=async()=>{
      const tableBody = document.getElementById("table");
    const data=await fetch(api,
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
    );

    const quotesData=await data.json();
    
    
    const quotes=quotesData.data.map(quote => `
        <tr class="hover:bg-gray-50">

            <td class="border px-6 py-4">
                ${quote.text}
            </td>
            <td class="border px-6 py-4">
                ${quote.author}
            </td>
            <td class=" flex border px-6 py-4 text-center space-x-2">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//   <button
  class="bg-blue-500 text-white px-4 py-2 rounded"
  onclick="goToEditPage('${quote._id}')">
  Edit

                </button>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                 onclick="deleteQuotes('${quote._id}')">
                    Delete
                </button>
            </td>
        </tr>
    `);

   tableBody.innerHTML=await quotes.join("") ;
   
    
} 
getQuotes();


function goToEditPage(id) {
     window.location.href = `editQuotes.html?id=${id}`;
}

const loadEditQuote = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  const res = await fetch(`${api}/${id}`);
  const data = await res.json();



  document.getElementById("editAuthor").value = data.data.author;
  document.getElementById("editQuotes").value = data.data.text;

  window.editId = id;
};

loadEditQuote();

const updateQuote = async () => {
  const author = document.getElementById("editAuthor").value;
  const text = document.getElementById("editQuotes").value;

  await fetch(`${api}/${window.editId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text })
  });

  alert("Quote updated");
  window.location.href = "index.html";
};


 
const saveQuote=async()=>{
     const author = document.getElementById("author").value;
    const text = document.getElementById("quote").value;
    await fetch(api,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ author, text })
        }
    );
    alert("Quote added successfully!")

}

const deleteQuotes = async (id) => {
  try {
    const res = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete quote");
    }

    alert("Quote deleted successfully!");
    getQuotes();
  } catch (error) {
    alert(error.message);
  }
};




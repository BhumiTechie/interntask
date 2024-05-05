
let contacts = [];

function displayContacts(filteredContacts) {
    const contactsContainer = document.getElementById('contacts');
    contactsContainer.innerHTML = '';

    filteredContacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Status: ${contact.status}</p>
            <p>Email: ${contact.email}</p>
			<p>Phone: ${contact.phone}</p>

        `;
        contactsContainer.appendChild(contactDiv);
    });
}

document.getElementById('allBtn').addEventListener('click', () => {
    const filteredContacts = contacts;
    displayContacts(filteredContacts);
});

document.getElementById('unreadBtn').addEventListener('click', () => {
    const filteredContacts = contacts.filter(contact => contact.status === 'Unread');
    displayContacts(filteredContacts);
});

document.getElementById('awaitingReplyBtn').addEventListener('click', () => {
    const filteredContacts = contacts.filter(contact => contact.status === 'Awaiting Reply');
    displayContacts(filteredContacts);
});

document.getElementById('needsReplyBtn').addEventListener('click', () => {
    const filteredContacts = contacts.filter(contact => contact.status === 'Needs Reply');
    displayContacts(filteredContacts);
});


document.getElementById('createFilterBtn').addEventListener('click', () => {
    const filterName = document.getElementById('filterName').value.trim();
    if (filterName !== '') {
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterName.toLowerCase()));
        displayContacts(filteredContacts);
    }
});

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/contacts'); // Replace with your actual endpoint URL
        if (!response.ok) {
            throw new Error('Failed to fetch data. Server returned ' + response.status);
        }
        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        
        const errorMessageElement = document.getElementById('error-message');
        if (errorMessageElement) { 
            errorMessageElement.textContent = error.message;
        }
    }
}

// Call the fetchData function to start fetching data
fetchData();


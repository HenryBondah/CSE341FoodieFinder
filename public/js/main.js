document.getElementById('login').addEventListener('click', showLogin);
document.getElementById('register').addEventListener('click', showRegister);
document.getElementById('home').addEventListener('click', showHome);

function showLogin() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  `;
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function showRegister() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Register</h2>
    <form id="registerForm">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" required>
      </div>
      <div>
        <label for="location">Location</label>
        <input type="text" id="location" required>
      </div>
      <div>
        <label for="foodPreferences">Food Preferences</label>
        <input type="text" id="foodPreferences" placeholder="Comma separated" required>
      </div>
      <button type="submit">Register</button>
    </form>
  `;
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

function showHome() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Welcome to Foodie Finder</h2>
    <p>Find the best food around you!</p>
    <div class="food-list" id="food-list"></div>
  `;
  fetchFoods();
}

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      localStorage.setItem('token', data.token); // Save token in local storage
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Login failed');
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const location = document.getElementById('location').value;
  const foodPreferences = document.getElementById('foodPreferences').value.split(',');

  try {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, location, foodPreferences })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful');
    } else {
      alert('Registration failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed');
  }
}

async function fetchFoods() {
  try {
    const response = await fetch('http://localhost:8080/api/foods');
    const foods = await response.json();
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';
    foods.forEach(food => {
      const foodItem = document.createElement('div');
      foodItem.className = 'food-item';
      foodItem.innerHTML = `
        <img src="path/to/image.jpg" alt="${food.name}">
        <h3>${food.name}</h3>
        <p>Price: $${food.price}</p>
        <p>Location: ${food.location}</p>
        <p>Category: ${food.category}</p>
        <p>Vendor: ${food.vendor}</p>
        <button onclick="editFood('${food._id}')">Edit</button>
        <button onclick="deleteFood('${food._id}')">Delete</button>
      `;
      foodList.appendChild(foodItem);
    });
  } catch (error) {
    console.error('Error fetching foods:', error);
  }
}

async function editFood(id) {
  const name = prompt('Enter new name:');
  const price = prompt('Enter new price:');
  const discount = prompt('Enter new discount:');
  const location = prompt('Enter new location:');
  const category = prompt('Enter new category:');
  const vendor = prompt('Enter new vendor:');
  try {
    const response = await fetch(`http://localhost:8080/api/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, price, discount, location, category, vendor })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Food updated successfully');
      fetchFoods();
    } else {
      alert('Update failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error updating food:', error);
  }
}

async function deleteFood(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/foods/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      alert('Food deleted successfully');
      fetchFoods();
    } else {
      alert('Delete failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error deleting food:', error);
  }
}

// Initialize the home view
showHome();

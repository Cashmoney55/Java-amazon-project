

⸻

🛒 Amazon-Style E-Commerce Web Application

A modular Amazon-inspired e-commerce web application built using modern JavaScript (ES6), object-oriented programming, and unit testing.

This project simulates a real-world shopping cart and checkout system with persistent state management and dynamic UI rendering.

⸻

🚀 Features
	•	Add products to cart
	•	Remove products from cart
	•	Update product quantity
	•	Select delivery options
	•	Dynamic order summary rendering
	•	Real-time payment summary calculation
	•	Persistent cart storage using LocalStorage
	•	Unit testing with Jasmine

⸻

🏗️ Architecture

This project was refactored from a functional design to a class-based architecture.

Key Components:

🧠 Cart Class
	•	Encapsulates cart state
	•	Handles:
	•	addToCart()
	•	removeFromCart()
	•	updateDeliveryOption()
	•	loadFromStorage()
	•	saveToStorage()
	•	Uses private fields for internal configuration
	•	Persists data using the LocalStorage API

🧩 Modular Structure
	•	ES6 import/export modules
	•	Separation of concerns:
	•	cart-class.js
	•	orderSummary.js
	•	paymentSummary.js
	•	amazon.js

This improves scalability and maintainability.

⸻

🧪 Testing

Unit tests were written using Jasmine.

Test coverage includes:
	•	Rendering the order summary
	•	Removing products from the cart
	•	Updating delivery options
	•	Validating cart state updates
	•	Verifying DOM changes

Tests required refactoring during OOP migration to align with class-based architecture.

⸻

💻 Technologies Used
	•	JavaScript (ES6)
	•	Object-Oriented Programming
	•	DOM Manipulation
	•	LocalStorage API
	•	Jasmine (Unit Testing)
	•	HTML & CSS

⸻

🔄 Key Learning Outcomes
	•	Transitioned from procedural to object-oriented design
	•	Implemented state management in a front-end application
	•	Improved modular architecture using ES6 modules
	•	Debugged state synchronization and test failures
	•	Understood how to refactor code without breaking existing functionality
	•	Strengthened knowledge of testing and edge-case handling

⸻

🛠️ Installation
	1.	Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git

	2.	Open the project folder.
	3.	Run using Live Server or open index.html in your browser.

⸻

📌 Future Improvements
	•	Backend API integration
	•	User authentication system
	•	Database storage instead of LocalStorage
	•	Security improvements and input validation
	•	Improved UI/UX responsiveness

⸻



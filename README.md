# nima82n

# Personal Finance Tracker

This is a personal finance tracking web application that allows users to manage and view their financial transactions, with features for tracking categories, visualizing transaction data, and converting currency values.

## Distinctiveness and Complexity
This project satisfies the distinctiveness and complexity requirements in several ways:

1. **Distinctiveness :** This project satisfies the distinctiveness requirement because it combines multiple functionalities into a single, cohesive personal finance tracking system. Unlike basic CRUD (Create, Read, Update, Delete) apps, this project introduces additional layers of functionality that make it stand out, including:

- Integrated Currency Conversion: The app connects to an external API to provide real-time currency exchange rates, allowing users to convert transaction amounts between different currencies.

- Dynamic Activity Visualization: The app includes an activity page that displays transaction trends over time in a visually appealing and interactive graph. This feature requires advanced data handling and visualization, beyond simple form submissions and data listings.

- Custom Category Management: Users can define their own transaction categories dynamically, enabling personalized financial tracking.

- Robust User Authentication: By leveraging Django’s built-in authentication system and customizing it to include features like a user-specific balance and transaction history, the app ensures secure and user-specific data handling.

- API Integration: The app supports RESTful APIs for handling transactions, categories, and currency conversion, making it extensible and useful as a backend for future mobile or web applications.

In essence, this project isn’t just a "To-Do List" or "Blog" but a full-featured personal finance application that combines unique functionalities.

2. **Complexity:** This project demonstrates complexity through several advanced concepts and technical implementations:
- **Database Relationships:**
   - Models like Transaction and Category are linked through foreign keys, and the User model incorporates a custom balance field, requiring thoughtful data modeling and management.
   - Transaction data involves not only simple CRUD operations but also calculations to update the user’s balance dynamically.
- **Dynamic AJAX Interactions:**
   - Features like adding categories and transactions involve asynchronous requests (AJAX) to update data in real-time without reloading the page. This improves the user experience and requires integrating front-end and back-end workflows.
- **Data Visualization:**
   - The activity page dynamically generates graphs, requiring the aggregation of transaction data and rendering it in a user-friendly format. This involves advanced front-end libraries for data visualization.
- **Security Considerations:**
   - The app uses Django’s secure authentication system, including features like login, logout, and session management.
   - Sensitive data like the API key is managed via environment variables, adhering to best practices for secure development.
- **View Logic:** The project includes several advanced view functions like transaction, add_category and proxy.
- **Frontend and Backend Integration:**
   - JavaScript is used for dynamic features like infinite scrolling, real-time form interactions (e.g., adding categories), and updating the transaction graph based on user inputs.
   - The backend leverages Django to handle authentication, data processing, and API calls securely.
- **Third-Party Integration:**
   - The application integrates with the Exchange Rates API to retrieve real-time currency data for conversions.
- **Mobile Responsiveness:**
   - The layout dynamically adjusts to mobile views, such as repositioning the graph and filter sections for the activity page, ensuring usability across devices.

## Features

### 1. **Authentication**
   - The application includes login and registration pages, with Django handling form validation.
   - Unauthenticated users are redirected to the login page, with a registration link for new users.

### 2. **Home Page: Transaction Management**
   - Users can add new transactions by clicking on the green “Transaction” button.
   - Each transaction has an amount, category, type (deposit or withdraw) and timestamp.
   - A custom category can be added by clicking the “+” button next to the category selection.
   - Upon saving a transaction, the balance automatically updates based on the transaction type, which is displayed on the navbar.

### 3. **Transaction Reports**
   - Displays a report of past transactions, sorted by timestamp.
   - Allows filtering by **month**, **category**, and **transaction type**.
   - Pagination with infinite scroll shows 10 transactions initially, loading more as the user scrolls down.
   - Each transaction appears in a detailed card format.

### 4. **Activity Page: Graph and Statistics**
   - Shows a graph of recent transactions based on timestamp and amount, defaulting to a one-week view.
   - Filters are available for **category**, **date**, and **type**.
   - The graph updates dynamically based on selected filters.
   - A statistics card shows total deposit and withdraw amounts under the filters section.

### 5. **Currency Conversion**
   - Integrates with an external currency exchange API to retrieve real-time exchange rates.
   - Users can select a base and target currency, enter an amount, and see the converted value.
   - A “Your Balance” button fills the input with the current balance and sets the base currency to USD.

## File Descriptions

- `manage.py`: Django's command-line utility for administrative tasks.
- `pft/`: Contains settings, URL routing, and general configurations for the Django project.
- `finance/`: Manages the main finance-related models and views.
- `finance/admin.py`: Registers models for the admin page.
- `finance/forms.py`: Has a template for login and registration page.
- `finance/models.py`: This file defines the database structure for the project. Key models include:
   - User: Extends the default Django user model to include additional fields like balance.
   - Transaction: Stores transaction details (amount, type, category, etc.) for each user.
   - Category: Represents transaction categories (e.g., "Food," "Rent").
- `finance/urls.py`: This file defines the URL routing for the web application, linking each URL to the appropriate view function. It includes paths for both the main web pages and API endpoints.
- `finance/views.py`: This file contains all the view functions and classes for the application. Below is a breakdown of each view:
   - index(request):
      - Purpose: Serves as the homepage of the application.
      - Behavior:
         - Redirects unauthenticated users to the login page.
         - Fetches all available categories from the database.
         - Renders the index.html template with the list of categories.
   - register(request):
      - Purpose: Handles user registration.
      - Behavior:
         - Redirects authenticated users to the homepage.
         - Processes the registration form submission (POST request).
         - If valid, creates a new user and redirects to the homepage.
         - Renders the register.html template with the     registration form.
   - Login(LoginView):
      - Purpose: Custom login view for the application.
      - Behavior:
         - Renders the login.html template.
         - Redirects authenticated users to the homepage upon successful login.
   - logout_view(request):
      - Purpose: Logs out the user.
      - Behavior:
         - Logs out the current user.
         - Redirects to the homepage.
   - transaction(request):
      - Purpose: Processes user transactions (deposit or withdrawal).
      - Behavior:
         - Accepts only POST requests with JSON data.
         - Parses and validates the transaction data (amount, title, category, dorw for deposit/withdraw).
         - Updates the user's balance and creates a transaction record in the database.
         - Returns a JSON response with a success or error message.
   - add_category(request):
      - Purpose: Allows users to add new categories.
      - Behavior:
         - Accepts only POST requests with JSON data.
         - Validates the category name.
         - Adds a new category to the database.
         - Returns a JSON response with a success or error message.
   - transactions_list(request):
      - Purpose: Retrieves the list of transactions for the logged-in user.
      - Behavior:
         - Fetches and returns all transactions for the user in reverse chronological order as a JSON response.
   - categories(request):
      - Purpose: Retrieves the list of categories.
      - Behavior:
         - Fetches all categories and returns them as a JSON response.
   - convert(request):
      - Purpose: Serves the currency conversion page.
      - Behavior:
         - Renders the convert.html template.
   - activity(request):
      - Purpose: Serves the activity page with transaction data and filters.
      - Behavior:
         - Fetches all categories and passes them to the activity.html template.
   - proxy(request, name):
      - Purpose: Acts as a proxy for the exchange rate API.
      - Behavior:
         - Makes an API request to https://api.exchangeratesapi.io/v1/{name} using the API key.
         - Returns the API response as a JSON objec
- `finance/templates/finance`: Houses HTML files for the frontend.
   - layout.html: Has a base layout for navbar.
   - index.html: Displays the home page with transaction management and reports.
   - activity.html: Shows transaction data in graphical form with filter options.
   - convert.html: Provides a currency conversion interface.
   - login.html: Login page for users.
   - register.html: Registration page for new users.
- `finance/static/`: Holds CSS and JavaScript files.
   - activity.js: JavaScript for the graph and other things in activity page.
   - convert.js: JavaScript for API calling and converting currency rates.
   - index.js: JavaScript for the main page.
   - styles.css: Css styling for all the pages.
- `.env.example` : Shows an example how to place the API key.
- `requirements.txt`: Lists required Python packages for the project, including Django and any additional libraries for the API integration and data visualization.
- `PFT/settings.py`: Customizations in settings.py:
   - AUTH_USER_MODEL: The AUTH_USER_MODEL setting is set to 'finance.User', which indicates a custom user model (User) is defined in the finance app. This allows for extending the default user model to include additional fields or methods specific to the application's requirements.
   - Environment Variables (.env integration): The following lines are added to load environment variables securely:
      env = environ.Env()
      environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
      API_KEY = env('API_KEY')
      - Purpose: This configuration reads sensitive data (e.g., API keys) from a .env file instead of hardcoding them into the project.
      - Usage: The API_KEY variable is used for accessing the currency exchange API in the project. Ensure you have a .env file in your project root with a valid API_KEY entry (e.g., API_KEY=your_api_key_here).
- `PFT/urls.py`: The following line is added to the project's main urls.py file:

   path('', include('finance.urls'))
   - Purpose: This line routes all requests starting with the root URL (/) to the URL patterns defined in the finance app's urls.py file.

## How to Run the Application

1. **Install dependencies** by running:
   ```bash
   pip install -r requirements.txt
2. **Run database migrations**:
   python manage.py makemigrations finance
   python manage.py migrate
3. **Create a superuser for admin access** (optional):
   python manage.py createsuperuser
4. **Start the Django development server:
   python manage.py runserver
5. Open a browser and navigate to http://127.0.0.1:8000 to view the app.

## Additional Information
- Infinite Scrolling: Implements JavaScript and Django to progressively load transaction records for smooth user experience.
- Currency API: Make sure your API key is configured in the settings for real-time exchange rates.
- Responsive Design: The application layout adjusts based on screen size, with charts and stats displaying in a mobile-friendly format.

## How to Obtain an API Key

For some features of this project, such as the currency conversion functionality, you will need to obtain an API key. Follow the steps below to create your own API key:

### 1. Sign up for an API provider
   - Visit the (https://exchangeratesapi.io).
   - Create an account if you do not already have one.

### 2. Create an API Key
   - When you sign up the website automatically generates an API key for you.
   - After generation, copy your API key.

### 3. Add your API Key to the Project
   - In this project, the API key should be securely stored in a `.env` file.
   - If you do not have a `.env` file, create one in the root directory of the project.
   - Inside the `.env` file, add the following line (replacing `your_api_key_here` with the key you just copied):
     API_KEY=your_api_key_here

### 4. Run the Project
   - After adding your API key, follow the remaining setup instructions in the README to run the project.
   - The API features should now work, using your personal API key.


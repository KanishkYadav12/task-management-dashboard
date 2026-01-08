# Task Management Dashboard

A modern, responsive Task Management Dashboard built with React.js, Redux Toolkit, and Tailwind CSS. This application allows users to manage, filter, and search tasks with real-time updates and theme customization.

## 🎯 Features

### Core Features

- **Task Management**

  - Display a list of all tasks with title and status
  - View task status (Pending / Completed)
  - Perform actions: Edit, Delete, Mark as Complete/Pending

- **Add Task**

  - User-friendly form to add new tasks
  - Mandatory title validation
  - Instant task appearance in the list upon submission

- **Edit Task**

  - Edit existing task titles
  - Changes reflected immediately in the UI
  - Seamless user experience

- **Delete Task**

  - Remove tasks from the list
  - Instant removal from UI
  - Confirmation before deletion

- **Task Status Management**

  - Toggle between Completed and Pending status
  - Real-time status updates in the task list
  - Visual indicators for task status

- **Filter Tasks**

  - Filter by status: All, Completed, or Pending
  - Works seamlessly with search functionality
  - Dynamic filter switching

- **Search Tasks**

  - Search tasks by title
  - Works in combination with filters
  - Real-time search results

- **Light / Dark Theme**
  - Toggle between light and dark themes
  - Instant UI updates
  - Responsive theme switching

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Functional Components & Hooks)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **API:** JSON Server (Mock Data)
- **Linting:** ESLint
- **Package Manager:** npm

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🚀 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd Neura-dyanamics-task
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install JSON Server** (if not included)
   ```bash
   npm install -D json-server
   ```

## ▶️ Running the Project

### Development Mode

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:5173` (or the port Vite assigns)

2. **Start JSON Server** (in a separate terminal)
   ```bash
   npm run server
   ```
   Mock API will run on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run server` - Start the JSON Server for mock API
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── Filters/
│   │   ├── FilterButtons.jsx      # Status filter component
│   │   └── SearchBar.jsx          # Task search component
│   ├── Layout/
│   │   ├── Header.jsx             # App header with title
│   │   └── ThemeToggle.jsx        # Light/Dark theme toggle
│   ├── TaskForm/
│   │   └── TaskForm.jsx           # Form to add new tasks
│   └── TaskList/
│       ├── TaskItem.jsx           # Individual task component
│       └── TaskList.jsx           # Task list container
├── hooks/
│   ├── useTasks.js                # Custom hook for task logic
│   └── useTheme.js                # Custom hook for theme management
├── services/
│   └── api.js                     # API service for task operations
├── store/
│   ├── store.js                   # Redux store configuration
│   └── slices/
│       └── tasksSlice.js          # Redux slice for task state
├── utils/
│   └── constants.js               # Application constants
├── App.jsx                        # Main App component
├── index.css                      # Global styles
└── main.jsx                       # React entry point
```

## 🔧 API Endpoints

The application uses JSON Server to mock API endpoints. All operations are performed on the following endpoints:

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/tasks`     | Fetch all tasks       |
| POST   | `/tasks`     | Create a new task     |
| GET    | `/tasks/:id` | Fetch a specific task |
| PUT    | `/tasks/:id` | Update a task         |
| DELETE | `/tasks/:id` | Delete a task         |

## 📝 Task Object Structure

```json
{
  "id": 1,
  "title": "Task Title",
  "status": "Pending"
}
```

**Status Values:** `"Pending"` or `"Completed"`

## 🎨 Theme Toggle

- Click the theme toggle button in the header to switch between light and dark modes
- The theme preference is instantly applied to the entire application
- Theme colors are defined using Tailwind CSS utility classes

## 🔍 How to Use

1. **Add a Task:** Fill in the task title in the form and click "Add Task"
2. **Edit a Task:** Click the "Edit" button on a task card and update the title
3. **Delete a Task:** Click the "Delete" button to remove a task
4. **Change Status:** Click the task status button to toggle between Pending and Completed
5. **Filter Tasks:** Use the filter buttons (All, Completed, Pending) to view specific tasks
6. **Search Tasks:** Type in the search bar to find tasks by title
7. **Toggle Theme:** Click the theme toggle icon in the header to switch themes

## 🎯 Key Concepts Implemented

### React Hooks

- `useState` - For local component state
- `useEffect` - For side effects and data fetching
- Custom hooks (`useTasks`, `useTheme`) - For reusable logic

### Redux Toolkit

- Slice-based state management
- Async thunks for API operations
- Efficient state updates using Immer

### Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Flexible layouts for all screen sizes

### Clean Code Practices

- Modular component structure
- Separation of concerns
- Proper naming conventions
- Reusable custom hooks

## 🤝 Contributing

This project is created as part of an assignment. Feel free to explore the code and make improvements.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For any issues or questions regarding this project, please check the project structure and code comments for more details.

---

**Happy Task Managing! 🚀**

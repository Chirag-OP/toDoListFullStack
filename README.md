# ✅ Full Stack To-Do List App

This is a full-stack **To-Do List web application** built using:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM

It allows users to **add**, **view**, **edit** and **manage tasks** in real-time, with persistent storage in MongoDB.

---

## 🚀 Features
> ⚠️ Note: This version does **not include user authentication or data separation**. All tasks are stored globally and are visible to anyone using the app. A future update may include user-based task distinction.

- Add new tasks with a simple input field
- Display all current tasks
- **Edit tasks directly** via double-click
- Tasks are saved to MongoDB (persistent even after refresh)
- REST API endpoints (`GET`, `POST`) using Express
- Modular code using Mongoose Schema for tasks
- Responsive and minimal frontend design

---

## 🧰 Tech Stack

| Layer      | Technologies                           |
|------------|----------------------------------------|
| Frontend   | HTML, CSS, JavaScript                  |
| Backend    | Node.js, Express.js                    |
| Database   | MongoDB, Mongoose                      |
| Hosting    | Render                                 |

---

## 🗂️ Project Structure
```
toDoList_fullstack/
├── modules/
│ └── schema.js # Mongoose model for tasks
├── public/
│ ├── todolist.html # Frontend UI
│ ├── todolist.css # Styling
│ └── todolist.js # Client-side JS
├── toDoExpress.js # Main Express server
├── package.json
├── package-lock.json
```

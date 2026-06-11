# Proxmox Dashboard React 🖥️🔋

A modern, responsive, and high-fidelity Virtual Machine management interface built with **React**, **Vite**, and **Tailwind CSS**. It replicates a cloud hypervisor/Proxmox dashboard with real-time status updates, live resource monitoring, provisioning capabilities, and an activity log stream.

---

## 🚀 Key Features

- **📊 Comprehensive Dashboard Overview**: Real-time summary metrics of VM allocation (Total VMs, Active VMs, RAM utilization, and total storage).
- **⚡ Control Center**: Start, Stop, and Restart operations on individual virtual machines with visual feedback.
- **📈 Dynamic Performance History**: Inline resource utilization graphs (Sparklines/CPU history charts) for each virtual machine.
- **🛠️ VM Provisioning**: A dedicated creation wizard to deploy new VMs with configurable name, vCPU, memory, disk, and operating system specs.
- **🔍 Advanced Search**: Real-time filtering across VM IDs, names, nodes, IPs, and operating systems.
- **🪵 Live Event Log**: Full audit log for each VM tracking lifecycle events (starts, stops, backups, and network optimizations).
- **🎨 Material 3 Design System**: Custom theme configuration leveraging custom typography (Inter & JetBrains Mono), HSL colors, glassmorphic overlays, and clean micro-interactions.

---

## 🛠️ Tech Stack

- **Core Library**: React 19 (Context API for state management)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3 (Customized with Material 3 Design Tokens)
- **Icons**: Google Material Symbols
- **Bundler & Dev Server**: Vite

---

## 📁 Project Structure

```text
proxmox_dashboard_react/
├── src/
│   ├── components/       # Reusable UI components (Navbar, VMTable, SummaryCard, etc.)
│   ├── context/          # State management via React Context (VMProvider, useVM)
│   ├── layouts/          # Page layouts (MainLayout)
│   ├── pages/            # Application views (Dashboard, CreateVM, VMDetails)
│   ├── styles/           # Global styles and Tailwind configuration imports
│   ├── App.jsx           # Main App entry point
│   ├── main.jsx          # React DOM entry point
│   └── router.jsx        # Route definitions
├── public/               # Static assets
├── tailwind.config.js    # Customized Material Design 3 tokens
└── vite.config.js        # Vite configuration
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sp00fyBoi/proxmox-dashboard-react.git
   cd proxmox-dashboard-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 💻 Development Server

Run the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### 🏗️ Production Build

To compile and optimize the application for production:
```bash
npm run build
```
The production-ready assets will be generated in the `dist` directory. You can preview the build locally using:
```bash
npm run preview
```

### 🧹 Linting

Ensure code quality and style standards are met:
```bash
npm run lint
```